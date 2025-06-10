"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { axiosInstence } from "@/hooks/axiosInstence";
import Loading from "@/components/website/Loading";
import Link from "next/link";
import { practiceQuestionAnswers } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";

const PracticeQuestionResult = () => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setanswers] = useState<practiceQuestionAnswers[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const result = searchParams.get("result") || "";

  const limit = 8;

  useEffect(() => {
    if (!userId || !result) return;

    const fetchPracticeQuestions = async () => {
      setIsLoading(true);
      try {
        let res;

        if (result === "all-questions") {
          res = await axiosInstence.get(
            `/practice-question/${userId}?page=${currentPage}&limit=${limit}`
          );
          setanswers(res?.data?.data || []);
          setTotalPages(res?.data?.totalPages || 1);
        } else if (["general", "behavioral", "technical"].includes(result)) {
          res = await axiosInstence.get(
            `/practice-question/interview-type?userId=${userId}&type=${result}&page=${currentPage}&limit=${limit}`
          );
          setanswers(res?.data?.answers || []);
          setTotalPages(res?.data?.totalPages || 1);


          
        }
      } catch (err) {
        console.error("Error fetching practice questions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPracticeQuestions();
  }, [result, userId, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // pagination
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <Loading message="Loading, please wait..." />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-white text-center">
              <h1 className="text-4xl font-bold mb-2">
                {result === "all-questions"
                  ? `All Practice Questions`
                  : `${capitalizeFirstLetter(result)} Practice Questions`}
              </h1>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v6a4 4 0 01-4 4H6a4 4 0 01-4-4V5z"
                    clipRule="evenodd"
                  />
                </svg>
                Detailed Question Analysis
              </h2>

              {/* No Data Message */}
              {answers?.length === 0 && (
                <div className="text-center text-gray-500 text-lg py-12">
                  No practice question answers found.
                </div>
              )}

              {/* List of Answers */}
              <div className="space-y-6">
                {answers?.map((resultData, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex-1">
                          <span className="text-red-600 font-bold mr-[10px]">
                            Q: {(currentPage - 1) * limit + index + 1} -
                          </span>
                          {resultData.question}
                        </h3>
                        <div className="text-white rounded-2xl bg-red-600 px-4 py-2 text-sm font-bold flex items-center gap-2">
                          {resultData.score}/10
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Your Answer:
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-400">
                          <p className="text-gray-700 italic leading-relaxed">
                            {resultData.answer}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-red-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Feedback
                        </h4>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-gray-700 leading-relaxed">
                            {resultData.feedback}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {totalPages > 1 && (
                <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200 mt-8">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        currentPage === totalPages ||
                        (answers?.length ?? 0) < limit
                      }
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>

                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href={"/practice-questions"}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Continue Practice
                      </Link>
                    </div>
                    <nav
                      className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px"
                      role="navigation"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-red-600 text-sm font-medium text-white">
                        {currentPage}
                      </span>
                      <button
                        onClick={handleNext}
                        disabled={
                          currentPage === totalPages ||
                          (answers?.length ?? 0) < limit
                        }
                        className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestionResult;
