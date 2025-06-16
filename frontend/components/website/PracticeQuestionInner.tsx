"use client";
import SpeechToTextPage from "@/app/transcribe";
import { Button } from "@/components/ui/button";
import Loading from "@/components/website/Loading";
import { axiosInstence } from "@/hooks/axiosInstence";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";
import Timer from "@/hooks/timer";
import { SummitAns } from "@/types/types";
import { Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const PracticeQuestionInner = () => {
  const [questions, setQuestions] = useState<string[]>([]);

  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [summitAns, setsummitAns] = useState<SummitAns | null>(null);
  const searchParams = useSearchParams();
  const technology = searchParams.get("technology") || "";
  const userId = searchParams.get("user") || "";
  const interviewType = searchParams.get("interviewType") || "";
  const jobRole = searchParams.get("jobRole") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, seterror] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [questionId, setquestionDataId] = useState();

  // Fetch questions and sessionId from backend

  const getQuestion = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setIsLoading(true);

    if (!userId || !technology || !interviewType || !jobRole || !difficulty) {
      setIsLoading(false);
      return;
    }

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

      const sessionId = response?.data.questionId;
      localStorage.setItem("activePracticeInterviewId", sessionId);

      setQuestions(response?.data.question);
      console.log(response.data.question);

      setquestionDataId(sessionId);

      setAnswer("");
      setShowFeedback(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // resume test
  const resumeInterview = async (questionId: string, userId: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstence.get(
        `/practice-question/${userId}/${questionId}`
      );
      setQuestions(res?.data?.question);
      console.log("Resumed question:", res?.data);
    } catch (err) {
      console.error("Error resuming interview:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    if (technology && interviewType && jobRole && difficulty) {
      const questionId = localStorage.getItem("activePracticeInterviewId");

      if (questionId && userId) {
        resumeInterview(questionId, userId);
      } else {
        getQuestion();
      }

      hasRun.current = true;
    }
  }, []);

  // handle next question
  const handleNextQuestion = () => {
    if (technology && interviewType && jobRole && difficulty) {
      getQuestion();
      setShowFeedback(false);
      setAnswer("");

      setsummitAns(null);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      seterror("Please provide an answer before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const questionDataId = localStorage.getItem("activePracticeInterviewId");

      const response = await axiosInstence.post("/practice-question/answer", {
        userId: userId,
        answer,
        role: jobRole,
        level: difficulty,
        interviewType,
        questionId: questionId || questionDataId,
        questions,
      });

      setsummitAns(response.data);
      setAnswer("");
      setShowFeedback(true);

      localStorage.removeItem("activePracticeInterviewId");
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // summit session
  const handleSubmitSession = () => {
    localStorage.removeItem("activePracticeInterviewId");
    window.location.href = "/mock-test-results";
  };

  if (isLoading || isSubmitting) {
    return <Loading message=" Loading, please wait..." />;
  }

  return (
  
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-red-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-red-200 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-red-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
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
                      {interviewType.toLocaleUpperCase() || "Technical"}{" "}
                      INTERVIEW
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
                        {capitalizeFirstLetter(technology) || "Full Stack"}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        {capitalizeFirstLetter(jobRole) || "Software Engineer"}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {capitalizeFirstLetter(difficulty) || "Intermediate"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div>
                      <div className="flex items-center space-x-2 text-white">
                        <Clock size={18} />
                        <span className="font-semibold">
                          <Timer
                            initialTime={120}
                            isRunning={!isLoading && !showFeedback}
                            onTimeout={() => {
                              setIsTimeOut(true);
                            }}
                          />
                        </span>
                      </div>
                    </div>
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
                      <p className="text-red-600 font-medium">
                        Technical Assessment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {capitalizeFirstLetter(difficulty) || "Intermediate"}
                    </div>
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {questions}
                  </p>
                </div>

                {!questions && (
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
                  disabled={showFeedback}
                />

                {showFeedback ? (
                  <>
                    {" "}
                    <div className="mt-3">
                      <h4 className="text-md font-semibold text-red-600">
                        Feedback:
                      </h4>
                      <p className="text-gray-700 mb-2">
                        Here’s how you can improve:
                      </p>
                      <div className="pl-4 border-l-2 border-red-300">
                        <p className="mb-2">
                          <span className="font-medium">
                            Score: {summitAns?.score}
                          </span>{" "}
                          {/* {resultData.score}/10 */}
                        </p>
                        <p className="font-medium mb-1">
                          Constructive Feedback: {summitAns?.feedback || "N/A"}
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                          {/* <li>{resultData.feedback}</li> */}
                        </ol>
                      </div>
                    </div>
                  </>
                ) : null}

                <span className="text-[13px] text-red-600">{error}</span>

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

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-6">
                {showFeedback ? (
                  <>
                    {/* next question */}
                    <Button
                      onClick={handleNextQuestion}
                      className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-3">
                        Next Question
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
                    {/* summit session */}
                    <Button
                      onClick={handleSubmitSession}
                      className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-3">
                        Summit Session
                      </span>
                    </Button>
                  </>
                ) : (
                  <>
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
                    <Button
                      onClick={handleNextQuestion}
                      className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-3">
                        Next Question
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
                  </>
                )}
              </div>
            </div>
            {isTimeOut && (
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
                      Your time for this question has expired. Please submit
                      your answer to continue.
                    </p>
                    <Button
                      onClick={() => {
                        setIsTimeOut(false);
                        handleSubmit();
                      }}
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

export default PracticeQuestionInner;
