"use client";

import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MockInterviewSession = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const searchParams = useSearchParams();
  const technology = searchParams.get("technology") || "";
  const interviewType = searchParams.get("interviewType") || "";
  const jobRole = searchParams.get("jobRole") || "";
  const difficulty = searchParams.get("difficulty") || "";

  // Fetch questions and sessionId from backend
  const getQuestion = async () => {
    try {
      const response = await axiosInstence.post("/interview/start", {
        technology,
        interviewType,
        jobRole,
        difficulty,
      });

      setSessionId(response.data.sessionId);
      setQuestions(response.data.question || []);
      setCurrentIndex(0);
      setAnswer("");
      setShowFeedback(false);
      setTimeLeft(120);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (technology && interviewType && jobRole && difficulty) {
      getQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNext = () => {
    setAnswer("");
    setShowFeedback(false);
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setTimeLeft(120);
  };

  const [nextQuestion, setnextQuestion] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axiosInstence.post("/interview/answer", {
        sessionId,
        answer,
      });

      setShowFeedback(true);
      setnextQuestion(response.data.nextQuestion);
      setAnswer("");
      setTimeLeft(120);

      setShowFeedback(true);

      if (response.data?.nextQuestion) {
        setQuestions((prev) => [...prev, response.data.nextQuestion]);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  console.log(nextQuestion);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-600 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            General Round - {currentIndex + 1} out of 30
          </h1>
          <div className="bg-white text-red-600 px-4 py-1 rounded-full font-medium">
            Mock Interview
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Question - {currentIndex + 1} out of 30
            </h2>
            <span
              className={`font-bold px-3 py-1 rounded-full ${
                timeLeft < 30
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              ⏳ {formatTime(timeLeft)}
            </span>
          </div>
          <p className="text-gray-700 text-lg mt-4">
            {questions ? questions : ""}
            {nextQuestion ? nextQuestion : ""}
          </p>
        </div>

        {/* Answer Input */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <label
            htmlFor="answer"
            className="block text-gray-700 mb-2 font-medium"
          >
            Your Answer
          </label>
          <textarea
            id="answer"
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={showFeedback}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          {!showFeedback && timeLeft > 0 && (
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Submit Answer
            </Button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full">
              <h3 className="text-lg font-semibold text-red-600 mb-2 flex items-center">
                AI Feedback
              </h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4 border-l-4 border-red-600">
                <p className="text-gray-700 mb-2">
                  Clear structure and good use of examples. Try to elaborate a
                  bit more on your role in the project.
                </p>
              </div>
              <Button
                onClick={handleNext}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
              >
                Next Question
              </Button>
            </div>
          )}

          {/* Time's up auto-submit */}
          {timeLeft === 0 && !showFeedback && (
            <div className="text-center bg-white border border-red-200 rounded-lg p-6 shadow-md w-full">
              <p className="font-medium mb-4 text-red-600">⏰ Time's up!</p>
              <Button
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
              >
                See Feedback
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterviewSession;
