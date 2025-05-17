import React from 'react'

import {
    Bot,
    Brain,
    LaptopMinimalCheckIcon,
    ShieldQuestionIcon,
  } from "lucide-react";

const HomeItems = () => {
  return (
   <>
    <div className="  px-4 sm:px-6 lg:px-8 py-12  from-gray-50 to-white ">
      <div className="text-center mb-16">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl  lg:text-5xl mb-6">
          Interview <span className="text-gray-700">Copilot</span>
        </h1>
        <p className="l mx-auto text-xl text-gray-500">
          Interview Copilot is your real-time AI partner that offers on-the-fly,
          personalized interview support. It transcribes each question, analyzes
          job descriptions and company details, and provides dynamic guidance
          tailored to your background. With coverage across 100+ industries,
          multilingual support, and seamless integration into popular meeting
          platforms, you’ll confidently tackle any live interview question that
          comes your way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  w-full">
        {/* CARD TEMPLATE START */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Mock Interview</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 mb-6">
              <LaptopMinimalCheckIcon />
            </div>
            <button className="mt-auto w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
              Practice Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Practice Questions
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 mb-6">
              <ShieldQuestionIcon />
            </div>
            <button className="mt-auto w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
              Practice Now
            </button>
          </div>
        </div>

        {/* Preparation Hub */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Preparation Hub
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 mb-6">
              <Brain />
            </div>
            <button className="mt-auto w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
              Explore Now
            </button>
          </div>
        </div>

        {/* Career Guide */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Career Guide</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 mb-6">
              <Bot />
            </div>
            <button className="mt-auto w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600">
          <span className="text-sm font-medium">100+ industries supported</span>
        </div>
      </div>
    </div></>
  )
}

export default HomeItems