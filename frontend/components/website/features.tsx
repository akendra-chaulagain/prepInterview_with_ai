import {  Brain, LaptopMinimalCheckIcon,  ShieldQuestionIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Features = () => {
  return (
    <>
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to ace your interviews
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Comprehensive tools designed to prepare you for any interview
              scenario
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {/* Mock Interview Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col transform hover:-translate-y-1 hover:border-red-100">
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">
                  Mock Interview
                </h2>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6">
                  <LaptopMinimalCheckIcon className="w-8 h-8" />
                </div>
                <p className="text-gray-600 mb-6">
                  Practice with realistic AI-powered mock interviews tailored to
                  your target role and industry.
                </p>
                <Link
                  href={"/mock-interview"}
                  className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-sm flex justify-center"
                >
                  Practice Now
                </Link>
              </div>
            </div>

            {/* Practice Questions Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col transform hover:-translate-y-1 hover:border-red-100">
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">
                  Practice Questions
                </h2>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6">
                  <ShieldQuestionIcon className="w-8 h-8" />
                </div>
                <p className="text-gray-600 mb-6">
                  Access a vast library of industry-specific questions with
                  expert-crafted sample answers.
                </p>
                <Link
                  href={"/practice-questions"}
                  className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-sm flex justify-center"
                >
                  Explore Questions
                </Link>
              </div>
            </div>

            {/* Preparation Hub Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col transform hover:-translate-y-1 hover:border-red-100">
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">
                  Preparation Hub
                </h2>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6">
                  <Brain className="w-8 h-8" />
                </div>
                <p className="text-gray-600 mb-6">
                  Comprehensive resources to build your interview strategy and
                  perfect your responses.
                </p>
                <Link href={"/"} className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-sm flex justify-center">
                  Start Preparing
                </Link>
              </div>
            </div>

            {/* Career Guide Card */}
          </div>
        </div>
      </div>
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by professionals worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div className="p-6">
              <p className="text-5xl font-bold text-red-600 mb-2">100+</p>
              <p className="text-gray-600 font-medium">Industries Covered</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-red-600 mb-2">50k+</p>
              <p className="text-gray-600 font-medium">Practice Sessions</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-red-600 mb-2">92%</p>
              <p className="text-gray-600 font-medium">Success Rate</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-bold text-red-600 mb-2">24/7</p>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features