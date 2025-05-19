"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const questions = [
  "Tell me about yourself.",
  "Describe a challenging technical problem you've solved.",
  "How do you handle conflicts in a team environment?",
];

const MockInterviewSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  // Timer logic
  useEffect(() => {
    if (showFeedback || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showFeedback]);

  // Reset timer and fields when moving to the next question
  const handleNext = () => {
    setAnswer("");
    setShowFeedback(false);
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setTimeLeft(120);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header/Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-600 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            Genaral Round - 1 out of 30
          </h1>
          <div className="bg-white text-red-600 px-4 py-1 rounded-full font-medium">
            Mock Interview
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentIndex + 1} of {questions.length}
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
            {questions[currentIndex]}
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

        {/* Action Buttons */}
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

          {/* Auto-submit when time is up */}
          {timeLeft === 0 && !showFeedback && (
            <div className="text-center bg-white border border-red-200 rounded-lg p-6 shadow-md w-full">
              <p className="font-medium mb-4 text-red-600">
                ⏰ Time&apos;s up!
              </p>
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
