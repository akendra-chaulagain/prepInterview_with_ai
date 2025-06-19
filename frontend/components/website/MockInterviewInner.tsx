"use client";

import { Button } from "@/components/ui/button";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Clock, CheckCircle, AlertCircle, ArrowRight, Pen } from "lucide-react";
import Loading from "@/components/website/Loading";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import SpeechToTextPage from "@/app/transcribe";

const MockInterviewInner = () => {
  // get userId
  const { userId } = useAuth();

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

  // This function will be called when the component mounts
  const getQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstence.post("/interview/start", {
        userId,
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
  // clear the sessionId from local storage
  const handleCompleteInterview = () => {
    localStorage.removeItem("activeInterviewId");
  };

  if (isLoading) {
    return <Loading message=" Preparing your interview..." />;
  }
  if (!questions.length) return <div>No questions found.</div>;

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

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Pen className="w-5 h-5 text-white" />
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
                <SpeechToTextPage
                  onTranscriptChange={(newTranscript: string) =>
                    setAnswer(newTranscript)
                  }
                />

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
              // disabled={showFeedback}
            />

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
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
                {currentIndex + 1 === 30 ? (
                  <Link
                    onClick={handleCompleteInterview}
                    href={`/mock-interview/interview/complete?result=${sessionId}`}
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

export default MockInterviewInner;
