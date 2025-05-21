"use client";

import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Send,
} from "lucide-react";
import Loading from "@/components/website/Loading";
import Link from "next/link";

const MockInterviewSession = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [nextQuestion, setnextQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const technology = searchParams.get("technology") || "";
  const interviewType = searchParams.get("interviewType") || "";
  const jobRole = searchParams.get("jobRole") || "";
  const difficulty = searchParams.get("difficulty") || "";

  // Fetch questions and sessionId from backend (start interview)
  // This function will be called when the component mounts
  const getQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstence.post("/interview/start", {
        technology,
        interviewType,
        jobRole,
        difficulty,
      });

      const saveSessionIdToLocalStorage = response.data.sessionId;
      localStorage.setItem("activeInterviewId", saveSessionIdToLocalStorage); // Save sessionId to local storage
      // Set sessionId and questions in state
      setSessionId(saveSessionIdToLocalStorage);
      setQuestions(response.data.question || []);
      setCurrentIndex(0);
      setAnswer("");
      setTimeLeft(120);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // resume the test
  // Resume existing interview session
  const resumeInterview = async (sessionId: string) => {
    setIsLoading(true);
    try {
    
      const res = await axiosInstence.get(`/interview/${sessionId}`);

      const { question, currentIndex, answer, timeLeft } =
        res.data.interviewDoc;

      setSessionId(sessionId);
      setQuestions(question[currentIndex] || []);
      setCurrentIndex(currentIndex || 0);
      setAnswer(answer || "");
      setTimeLeft(timeLeft || 120);
    } catch (err) {
      console.error("Error resuming interview:", err);
      // fallback: start a new session if resume fails
    } finally {
      setIsLoading(false);
    }
  };
  // Check if sessionId is present in URL and resume interview
  useEffect(() => {
    const initializeInterview = async () => {
      const savedSessionId = localStorage.getItem("activeInterviewId");

      if (savedSessionId) {
        await resumeInterview(savedSessionId);
      } else {
        await getQuestion();
      }
    };

    if (technology && interviewType && jobRole && difficulty) {
      initializeInterview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading, timeLeft]);

  // summit answer
  // This function will be called when the user submits their answer
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstence.post("/interview/answer", {
        sessionId,
        answer,
      });
      setnextQuestion(response.data.nextQuestion);
      setAnswer("");
      setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
      setTimeLeft(120); // Reset timer for next question
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time in MM:SS
  // This function will be used to display the remaining time

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate progress percentage
  // This function will be used to set the width of the progress bar
  const getProgressPercentage = () => {
    return `${(currentIndex / 30) * 100}%`;
  };

  if (isLoading) {
    return <Loading message=" Preparing your interview..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Mock Interview Session</h1>
                <p className="text-red-100 mt-1">
                  {technology} • {jobRole} • {difficulty} • {interviewType}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock size={18} />
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentIndex + 1} of 30
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((currentIndex / 30) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: getProgressPercentage() }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold">{currentIndex + 1}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Current Question
            </h2>

            <div className="ml-auto">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  timeLeft < 3
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {timeLeft < 3 ? (
                  <>
                    <AlertCircle size={14} className="mr-1" /> Time running out
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} className="mr-1" />{" "}
                    {formatTime(timeLeft)}
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {nextQuestion
                ? nextQuestion
                : questions || "No question available"}
            </p>
          </div>
        </div>

        {/* Answer Input */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <label
            htmlFor="answer"
            className="block text-gray-700 mb-2 font-medium flex items-center"
          >
            <Send size={16} className="mr-2 text-red-600" />
            Your Answer
          </label>
          <textarea
            id="answer"
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
            <div>
              {answer.length > 0
                ? `${answer.length} characters`
                : "Start typing your answer"}
            </div>
            {timeLeft <= 3 && (
              <div className="text-red-500 font-medium flex items-center">
                <Clock size={14} className="mr-1" /> {formatTime(timeLeft)}{" "}
                remaining
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || answer.trim().length === 0}
            className={`bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg flex items-center transition-all ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                {/* when the user complete the test */}
                {currentIndex + 1 === 3 ? (
                  <Link
                    href={"/mock-interview/interview-complete"}
                    className="flex items-center"
                  >
                    Summit Interview <ArrowRight size={16} className="ml-2" />
                  </Link>
                ) : (
                  <span className="flex items-center">
                    Next Question <ArrowRight size={16} className="ml-2" />
                  </span>
                )}
              </>
            )}
          </Button>

          {/* Time's up notification */}
          {timeLeft === 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <Clock size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Time&apos;s Up!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your time for this question has expired. Please submit your
                    answer to continue.
                  </p>
                  <Button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md w-full"
                  >
                    Submit & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterviewSession;
