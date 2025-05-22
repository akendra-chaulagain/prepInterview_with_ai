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
  const [nextQuestion, setnextQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);

  const searchParams = useSearchParams();
  const technology = searchParams.get("technology") || "";
  const userId = searchParams.get("user") || "";
  const interviewType = searchParams.get("interviewType") || "";
  const jobRole = searchParams.get("jobRole") || "";
  const difficulty = searchParams.get("difficulty") || "";

  // Fetch questions and sessionId from backend
  const getQuestion = async () => {
    try {
      const response = await axiosInstence.post(
        "/practice-question/generate-practice-question",
        {
          userId,
          technology,
          interviewType,
          jobRole,
          difficulty,
        }
      );

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
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosInstence.post("/interview/answer", {
        sessionId,
        answer,
      });
      setnextQuestion(response.data.nextQuestion);
      setAnswer("");
      setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
      setShowFeedback(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = ((currentIndex + 1) / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-red-200 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-red-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Enhanced Header with Progress */}
          <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-2xl shadow-2xl border border-red-500/20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-red-100 text-sm font-medium tracking-wide uppercase">
                      Live Session
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {interviewType || "Technical"} Interview
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-red-100">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {technology || "Full Stack"}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      {jobRole || "Software Engineer"}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {difficulty || "Intermediate"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {currentIndex + 1}
                      </div>
                      <div className="text-red-200 text-sm">
                        of 30 questions
                      </div>
                    </div>
                  </div>

                  <div
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                      timeLeft < 30
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 animate-pulse"
                        : timeLeft < 60
                        ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30"
                        : "bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-red-100 text-sm font-medium">
                    Progress
                  </span>
                  <span className="text-red-100 text-sm font-bold">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Question Card */}
          <div className="group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-red-50 to-red-100 px-8 py-6 border-b border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Question {currentIndex + 1}
                    </h2>
                    <p className="text-red-600 font-medium">
                      Technical Assessment
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {difficulty || "Intermediate"}
                  </div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {nextQuestion ||
                    questions[currentIndex] ||
                    "Loading your next challenge..."}
                </p>
              </div>

              {!nextQuestion && !questions[currentIndex] && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3 text-red-600">
                    <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">
                      Preparing your question...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Answer Input */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Your Response
                    </h3>
                    <p className="text-gray-600">
                      Take your time to craft a thoughtful answer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isRecording
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isRecording ? "bg-white animate-pulse" : "bg-red-600"
                      }`}
                    ></div>
                    {isRecording ? "Recording..." : "Record"}
                  </button>
                  <div className="text-sm text-gray-500 font-medium">
                    {answer.length} chars
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <textarea
                rows={8}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Share your thoughts, approach, and solution here. Be as detailed as possible to get better feedback..."
                className="w-full p-6 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all duration-300 text-gray-700 text-lg leading-relaxed placeholder-gray-400"
                disabled={showFeedback}
              />

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Auto-save enabled
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    AI will provide feedback
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  Recommended: 150+ words for detailed feedback
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {timeLeft === 0 && !showFeedback ? (
              <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 shadow-xl w-full max-w-md">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-bold text-xl mb-2 text-orange-800">
                  Time's Up! ⏰
                </p>
                <p className="text-orange-700 mb-6">
                  Don't worry, let's see how you did
                </p>
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get My Feedback
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    Submit Answer
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Button>

                <button className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300 px-6 py-4 rounded-xl hover:bg-red-50">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Need Help?
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Take Notes
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Save Question
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Session Active
                </span>
                <span>•</span>
                <span>Auto-saved 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewSession;
