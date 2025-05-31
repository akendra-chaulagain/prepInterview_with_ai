"use client";
import React, { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function AICareerCoach() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestedQuestions = [
    {
      text: "How do I transition from my current career to a new field without taking a step back in salary?",
    },
    {
      text: "How can I make my resume stand out for a data analyst position?",
    },
    {
      text: "What are the best ways to prepare for a leadership role in my industry?",
    },
    {
      text: "What are some strategies for negotiating a higher salary during a job offer?",
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages([newMessage]);
      setInputMessage("");
      setShowSuggestions(false);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "assistant",
          content:
            "Thank you for your question! As your AI Career Coach, I'm here to help you with personalized career advice. This would be where I provide detailed guidance based on your specific situation.",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question.text);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Career Coach</h1>
        <p className="text-gray-600 mt-1 max-w-4xl">
          Think of it as your own personal career coach—someone you can talk to
          like a friend who truly understands your professional goals.
          You&lsquo;ll get tailored job search strategies, career advice, and
          growth tips, all in one conversation.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {showSuggestions && messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ask me any questions about recruiting, interviews,
                <br />
                and careers development
              </h2>
            </div>

            {/* Suggested Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mb-12">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900">
                      {question.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-2xl px-6 py-4 rounded-2xl ${
                      message.type === "user"
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-6 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  showSuggestions
                    ? "What are the best ways to prepare for a leadership role in my industry?"
                    : "Ask me anything about your career..."
                }
                className="w-full pl-6 pr-14 py-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                style={{ minHeight: "56px", maxHeight: "120px" }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="absolute right-3 bottom-3 w-8 h-8 mb-3 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}
