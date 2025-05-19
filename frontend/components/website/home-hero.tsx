import { BookOpen, LaptopMinimalCheckIcon } from 'lucide-react';
import React from 'react'

const HeroSection = () => {
  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mb-6 text-center">
            Interview <span className="text-red-400">Copilot</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300 text-center mb-10">
            Your real-time AI partner for interview success. Get personalized
            support, expert guidance, and confidence-boosting preparation for
            your next opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg flex items-center">
              <LaptopMinimalCheckIcon className="w-5 h-5 mr-2" />
              Start Practicing
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection