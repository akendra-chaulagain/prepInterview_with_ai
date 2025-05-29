import React from "react";

const PracticeQuestionResult = () => {
  // Dummy data for the interview result
  const data = {
    jobRole: "Full Stack Developer",
    technology: "React & Node.js",
    interviewType: "Technical",
    difficulty: "Intermediate",
    overallScore: 7,
    answers: [
      {
        question:
          "What is the difference between let, const, and var in JavaScript?",
        answer:
          "Let and const are block-scoped while var is function-scoped. Const cannot be reassigned after declaration, but let can be. Var has hoisting behavior that can lead to unexpected results.",
        score: 8,
        feedback:
          "Good understanding of scope differences. You could improve by mentioning temporal dead zone and providing specific examples of hoisting behavior with var.",
      },
      {
        question: "Explain the concept of React Hooks and provide an example.",
        answer:
          "React Hooks are functions that let you use state and lifecycle features in functional components. useState is for managing state, useEffect for side effects.",
        score: 6,
        feedback:
          "Basic understanding shown but lacks depth. Consider explaining custom hooks, dependency arrays in useEffect, and provide concrete code examples.",
      },
      {
        question: "What is the purpose of middleware in Express.js?",
        answer:
          "Middleware functions execute during the request-response cycle. They can modify request/response objects, end the request-response cycle, or call the next middleware.",
        score: 7,
        feedback:
          "Solid conceptual understanding. You could enhance your answer by mentioning specific middleware types like body-parser, cors, and authentication middleware.",
      },
      {
        question: "How would you optimize a slow-performing React application?",
        answer:
          "I would use React.memo for component memoization, implement lazy loading, optimize bundle size, and use proper key props in lists.",
        score: 8,
        feedback:
          "Excellent practical knowledge! Consider also mentioning useCallback, useMemo, code splitting strategies, and performance profiling tools.",
      },
      {
        question: "Describe the SOLID principles in software development.",
        answer:
          "SOLID stands for Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles. They help create maintainable code.",
        score: 5,
        feedback:
          "You know the acronym but need to elaborate on each principle with examples. Explain how each principle contributes to better software design and provide practical scenarios.",
      },
    ],
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "bg-red-600";
    if (score >= 6) return "bg-red-600";
    return "bg-red-600";
  };

  const getProgressColor = (score) => {
    if (score >= 8) return "bg-red-600";
    if (score >= 6) return "bg-red-600";
    return "bg-red-600";
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-white">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Practice Questions</h1>
              </div>
            </div>

            {/* Question-wise Feedback */}
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

              <div className="space-y-6">
                {data?.answers?.map((resultData, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex-1">
                          <span className="text-red-600 font-bold">
                            Q{index + 1}:
                          </span>{" "}
                          {resultData.question}
                        </h3>
                        <div
                          className={`${getScoreColor(
                            resultData.score
                          )} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
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
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Continue Practice
                </button>
                <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Report
                </button>
              </div>
            </div>
          </div>

         
     
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestionResult;
