"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Clock,
  BarChart3,
  Search,
  Eye,
  Play,
  Calendar,
  TrendingUp,
  Award,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { axiosInstence } from "@/hooks/axiosInstence";
import { useAuth, useUser } from "@clerk/nextjs";
import Loading from "@/components/website/Loading";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";
import { MockInterViewResults } from "@/types/types";
import FormattedDate from "@/hooks/date";
import { Duration } from "@/hooks/duration";
import { showErrorToast } from "@/hooks/toast";
import { useRouter } from "next/navigation";

interface sessionLength {
  length: number;
  completed: boolean;
}

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
  const { user } = useUser();
  const router = useRouter();
  const [dataLength, setdataLength] = useState<sessionLength[] | null>([]);
  const toastShownRef = useRef(false);

  // get user's interview sessions
  useEffect(() => {
    if (!user) {
      if (!toastShownRef.current) {
        showErrorToast("You must be signed in to continue.");
        toastShownRef.current = true;
      }
      router.push("/sign-in");
      return;
    }

    setIsLoading(true);
    const getUserInterviewSessions = async () => {
      try {
        const response = await axiosInstence.get(
          `/interview/sessions/${userId}?page=${currentPage}&limit=${limit}`
        );
        setSessions(response?.data?.data);
        setTotalPages(response?.data?.totalPages || 1);
        setdataLength(response.data.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInterviewSessions();
  }, [userId, currentPage, router, user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // pagination handlers
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

  // handle search
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
  // complete test percentage
  const completedSessions = dataLength?.filter((test) => test?.completed) || [];
  const completedTests = completedSessions.length;
  const totalTests = dataLength?.length || 0;
  const completionRate =
    totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

  if (isLoading) {
    return <Loading message="Loading, please wait..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-red-50/40">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 mb-8">
          <div className="p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Mock Interview History
                  </h1>
                  <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                    Track your progress and performance over time
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Last updated today</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Performance trending up</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={"/mock-interview"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Play className="w-4 h-4" />
                  Start New Interview
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Interviews
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {dataLength?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Complete Interview
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {completedTests}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Completion Rate
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {completionRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {searchData ? "Your Search Results" : "Recent Interviews"}
                </h2>
                <p className="text-slate-600 text-sm">
                  Your complete interview history and performance
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search
                    onClick={handleSearch}
                    className="w-5 h-5 cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by technology, role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 pr-4 py-3 w-full sm:w-80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Interview Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    isCompleted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-slate-100">
                {searchData && searchData.length > 0
                  ? searchData.map((interview, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-white/80 transition-all duration-200 group"
                      >
                        <td className="px-8 py-6">
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-base">
                              {capitalizeFirstLetter(interview.jobRole)}
                            </div>
                            <div className="text-slate-600 text-sm">
                              {capitalizeFirstLetter(interview.interviewType)}{" "}
                              Interview
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <FormattedDate date={interview.updatedAt} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                            {capitalizeFirstLetter(interview.technology)}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                              interview.difficulty.toLowerCase() === "beginner"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : interview.difficulty.toLowerCase() ===
                                  "intermediate"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {capitalizeFirstLetter(interview.difficulty)}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div
                              className={`text-base font-bold text-red-600 }`}
                            >
                              {((interview.overallScore / 300) * 10).toFixed(0)}{" "}
                              out of 10
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-medium" key={interview._id}>
                              {Duration(
                                interview?.createdAt,
                                interview?.updatedAt
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                              interview.completed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {capitalizeFirstLetter(
                              String(interview?.completed)
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/mock-interview/interview/complete?result=${interview?._id}`}
                              className="inline-flex items-center justify-center w-9 h-9 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  : sessions?.map((interview, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white/80 transition-all duration-200 group"
                      >
                        <td className="px-8 py-6">
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-900 text-base">
                              {capitalizeFirstLetter(interview.jobRole)}
                            </div>
                            <div className="text-slate-600 text-sm">
                              {capitalizeFirstLetter(interview.interviewType)}{" "}
                              Interview
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <FormattedDate date={interview.updatedAt} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                            {capitalizeFirstLetter(interview.technology)}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                              interview.difficulty.toLowerCase() === "beginner"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : interview.difficulty.toLowerCase() ===
                                  "intermediate"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {capitalizeFirstLetter(interview.difficulty)}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div
                              className={`text-base font-bold text-red-600 }`}
                            >
                              {((interview.overallScore / 300) * 10).toFixed(0)}{" "}
                              out of 10
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">
                              <span className="font-medium" key={interview._id}>
                                {Duration(
                                  interview?.createdAt,
                                  interview?.updatedAt
                                )}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                              interview.completed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {capitalizeFirstLetter(
                              String(interview?.completed)
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/mock-interview/interview/complete?result=${interview?._id}`}
                              className="inline-flex items-center justify-center w-9 h-9 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          {searchData
            ? null
            : totalPages > 1 && (
                <div className="bg-white/60 backdrop-blur-sm px-8 py-6 border-t border-slate-200/60">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                      <nav className="flex items-center gap-2">
                        <button
                          onClick={handlePrevious}
                          disabled={currentPage === 1}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                                currentPage === i + 1
                                  ? "bg-red-600 text-white shadow-lg"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={handleNext}
                          disabled={
                            currentPage === totalPages ||
                            (sessions?.length ?? 0) < limit
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default MockInterviewHistory;
