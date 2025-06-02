"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  BarChart3,
  Trophy,
  MessageSquare,
  Search,
  Eye,
  Play,
} from "lucide-react";
import Link from "next/link";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useAuth } from "@clerk/nextjs";
import Loading from "@/components/website/Loading";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";
import { MockInterViewResults } from "@/types/types";

const MockInterviewHistory = () => {
  const { userId } = useAuth();
  const [sessions, setSessions] = useState<MockInterViewResults[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // search
  const [searchData, setsearchData] = useState<MockInterViewResults[] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 8;
  // Mock data for interview history
  const completedSessions = sessions?.filter((test) => test.completed) || [];
  const completedTests = completedSessions.length;
  // get user's interview sessions
  useEffect(() => {
    setIsLoading(true);
    const getUserInterviewSessions = async () => {
      try {
        const response = await axiosInstence.get(
          `/interview/sessions/${userId}?page=${currentPage}&limit=${limit}`
        );
        setSessions(response?.data?.data);
        setTotalPages(response?.data?.totalPages || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInterviewSessions();
  }, [userId, currentPage]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
  // averagre score
  const averageScore =
    completedTests > 0
      ? Math.round(
          completedSessions.reduce((sum, test) => sum + test.overallScore, 0) /
            completedTests
        )
      : 0;

  const handleSearch = async () => {
    setIsLoading(true);
    if (!searchTerm) {
      alert("Please enter the text first");
      return;
    }

    try {
      const response = await axiosInstence.get(
        `search/search-mock-interview?term=${searchTerm}`
      );
      setsearchData(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Loading, please wait..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Mock Interview History
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Track your progress and performance over time
                  </p>
                </div>
              </div>
              <Link
                href={"/mock-interview"}
                className="bg-red-600 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start New Interview
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4">
              <MessageSquare className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {sessions?.length}
                </p>
                <p className="text-sm text-gray-600">Total Interviews</p>
                {/* <p className="text-xs text-green-600 mt-1">+2 this week</p> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {completedTests}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xs text-gray-500 mt-1">
                  {sessions && sessions.length > 0
                    ? `${((completedTests / sessions.length) * 100).toFixed(
                        0
                      )}%`
                    : "0%"}
                  completion rate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {averageScore}%
                </p>
                <p className="text-sm text-gray-600">Average Score</p>
                {/* <p className="text-xs text-blue-600 mt-1">+5% improvement</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Interview History Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {searchData ? "Your Search Results" : "   Recent Interviews"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Your complete interview history and performance
              </p>
            </div>
            <div className="relative">
              <Search
                onClick={handleSearch}
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by technology, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interview Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchData && searchData.length > 0
                  ? searchData.map((interview, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Interview Row Rendering */}
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {capitalizeFirstLetter(interview.jobRole)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {capitalizeFirstLetter(interview.interviewType)}{" "}
                              Interview
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {interview.updatedAt}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {capitalizeFirstLetter(interview.technology)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              interview.difficulty.toLowerCase() === "beginner"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : interview.difficulty.toLowerCase() ===
                                  "intermediate"
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {capitalizeFirstLetter(interview.difficulty)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {interview.overallScore} out of 10
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {interview.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              interview.completed
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {capitalizeFirstLetter(
                              String(interview?.completed)
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/mock-interview/interview/complete?result=${interview?._id}`}
                            className="text-red-600 transition-colors p-2 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  : sessions?.map((interview, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Repeat the exact same rendering logic here */}
                        {/* ... same JSX structure as above ... */}
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {capitalizeFirstLetter(interview.jobRole)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {capitalizeFirstLetter(interview.interviewType)}{" "}
                              Interview
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {interview.updatedAt}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {capitalizeFirstLetter(interview.technology)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              interview.difficulty.toLowerCase() === "beginner"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : interview.difficulty.toLowerCase() ===
                                  "intermediate"
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {capitalizeFirstLetter(interview.difficulty)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {interview.overallScore} out of 10
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {interview.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              interview.completed
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {capitalizeFirstLetter(
                              String(interview?.completed)
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/mock-interview/interview/complete?result=${interview?._id}`}
                            className="text-red-600 transition-colors p-2 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {searchData
            ? null
            : totalPages > 1 && (
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
                        (sessions?.length ?? 0) < limit
                      }
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>

                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
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
                          (sessions?.length ?? 0) < limit
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
  );
};

export default MockInterviewHistory;
