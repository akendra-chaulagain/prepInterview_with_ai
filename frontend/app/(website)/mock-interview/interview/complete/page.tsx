"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { axiosInstence } from "@/hooks/axiosInstence";
import Loading from "@/components/website/Loading";
import { InterviewResult } from "@/types/types";

const Page = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const resultId = searchParams.get("result") || "";
  const [data, setData] = useState<InterviewResult | null>(null);
  const getInterviewResult = async (resultId: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstence.get<{ interviewDoc: InterviewResult }>(
        `/interview/${resultId}`
      );
      setData(res.data.interviewDoc);
    } catch (err) {
      console.error("Error resuming interview:", err);
      // fallback: start a new session if resume fails
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (resultId) {
      getInterviewResult(resultId);
    }
  }, [resultId]);

  if (isLoading) {
    return (
      <Loading message="Finalizing your interview results, please wait..." />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r  py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-1xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 px-6 py-8 text-white">
              <h1 className="text-3xl font-bold text-center">
                Interview Assessment Complete
              </h1>
              <p className="text-center mt-2 text-red-100">
                {data?.jobRole.toUpperCase()}
              </p>
            </div>

            {/* Interview Info */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Technology</p>
                  <p className="font-semibold text-gray-800">
                    {data?.technology.toUpperCase()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Interview Type</p>
                  <p className="font-semibold text-gray-800">
                    {data?.interviewType.toUpperCase()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="font-semibold text-gray-800">
                    {" "}
                    {data?.difficulty.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="px-6 py-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Overall Performance
                </h2>
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-xl font-bold">
                  {data?.overallScore}/10
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-2.5 bg-red-600 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Question-wise Feedback */}
            <div className="px-6 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Question-by-Question Assessment
              </h2>

              {/* Question 1 */}
              {data?.answers?.map((resultData, index: number) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Q{index + 1}: {resultData.question}
                    </h3>
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {resultData.score}/10
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-gray-600 italic">{resultData.answer}</p>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-md font-semibold text-red-600">
                      Feedback:
                    </h4>
                    <p className="text-gray-700 mb-2">
                      Here’s how you can improve:
                    </p>
                    <div className="pl-4 border-l-2 border-red-300">
                      <p className="mb-2">
                        <span className="font-medium">Score:</span>{" "}
                        {resultData.score}/10
                      </p>
                      <p className="font-medium mb-1">Constructive Feedback:</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>{resultData.feedback}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6">
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300">
                  Continue Practice
                </button>
              </div>

              {/* Additional Questions (would be dynamically rendered) */}
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2025 Interview Assessment Platform • All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
