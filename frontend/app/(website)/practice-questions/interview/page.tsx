"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const questions = [
  "Tell me about yourself.",
  "Describe a challenging technical problem you've solved.",
  "How do you handle conflicts in a team environment?",
];

const MockInterviewSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  // Timer logic
  useEffect(() => {
    if (showFeedback || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showFeedback]);

  // Reset timer and fields when moving to the next question
  const handleNext = () => {
    setAnswer("");
    setShowFeedback(false);
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setTimeLeft(120);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* Interview Type Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Technical- Practice Questions
          </h1>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <span className="text-red-600 font-bold">⏳ {timeLeft}s</span>
          </div>
          <p className="text-gray-700 text-lg mt-2">
            {questions[currentIndex]}
          </p>
        </div>

        {/* Answer Input */}
        <div>
          <label
            htmlFor="answer"
            className="block text-gray-700 mb-2 font-medium"
          >
            Your Answer
          </label>
          <textarea
            id="answer"
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black-500"
          />
        </div>

        {/* Submit Button */}
        {!showFeedback && timeLeft > 0 && (
          <Button onClick={handleSubmit}>Submit Answer</Button>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white border border-black-400 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-black-700 mb-2">
              AI Feedback
            </h3>
            <p className="text-gray-700 mb-2">
              ✅ Clear structure and good use of examples. Try to elaborate a
              bit more on your role in the project.
            </p>
            <p className="text-sm text-gray-500 mb-4">Score: 7.5 / 10</p>
            <Button onClick={handleNext}>Next Question</Button>
          </div>
        )}

        {/* Auto-submit when time is up */}
        {timeLeft === 0 && !showFeedback && (
          <div className="text-center mt-4">
            <p className="text-red-600 font-medium mb-2">⏰ Time&apos;s up!</p>
            <Button onClick={handleSubmit}>See Feedback</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewSession;
