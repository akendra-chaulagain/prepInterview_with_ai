import React from "react";

const MockInterviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-gray-700 to-red-400 text-white px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Mock Interview</h2>
        <p className="text-lg max-w-2xl text-gray-200">
          Sharpen your interview skills with our AI-powered mock interviews.
          Practice real-time behavioral and technical questions tailored to your
          role.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          What to Expect
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This mock interview session includes a curated set of 30 questions— a
          mix of general behavioral and technical questions based on your
          selected job role. Each response will receive real-time AI feedback to
          help improve your clarity, confidence, and structure.
        </p>

        {/* Start Button */}
        <div className="text-center mt-8">
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
            Start Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;
