import {
  Bot,
  Brain,
  BarChart3,
  GraduationCap,
  Users,
  Building,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const HowItWork = () => {
  return (
    <>
      {/* How It Works Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple steps to interview success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. Select Your Industry
              </h3>
              <p className="text-gray-600">
                Choose from over 100 industries to get tailored interview
                preparation specific to your field.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. Practice & Learn
              </h3>
              <p className="text-gray-600">
                Use our AI-powered tools to practice common interview questions
                and receive instant feedback.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Ace Your Interview
              </h3>
              <p className="text-gray-600">
                Enter your real interview with confidence, prepared for any
                question that comes your way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">
              Key Benefits
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why choose Interview Copilot?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Multilingual Support
                </h3>
                <p className="mt-2 text-gray-600">
                  Practice interviews in multiple languages to prepare for
                  global opportunities.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <Building className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Company-Specific Preparation
                </h3>
                <p className="mt-2 text-gray-600">
                  Get insights on specific companies interview styles and
                  expectations.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Performance Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  Track your progress with detailed feedback and improvement
                  suggestions.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Expert-Crafted Content
                </h3>
                <p className="mt-2 text-gray-600">
                  Access materials developed by industry professionals and
                  career coaches.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Real-Time Assistance
                </h3>
                <p className="mt-2 text-gray-600">
                  Get on-the-fly support during your actual interview with our
                  discreet tools.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <Bot className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  AI-Powered Personalization
                </h3>
                <p className="mt-2 text-gray-600">
                  Receive guidance tailored to your unique background and career
                  goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to land your dream job?
          </h2>
          <p className="mt-4 text-xl text-red-100 max-w-2xl mx-auto">
            Start practicing today and transform the way you approach
            interviews.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={"/mock-interview"}
              className="bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWork;
