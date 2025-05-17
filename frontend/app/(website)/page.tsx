"use client";

import { Laptop, LaptopMinimalCheckIcon } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl  lg:text-5xl mb-6">
          Interview <span className="text-gray-700">Copilot</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-500">
          Your AI-powered interview preparation assistant
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Mock Interview</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <LaptopMinimalCheckIcon />
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                Practice Now
              </button>
            </div>
          </div>
        </div>

        {/* Mock Interview Section */}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600">
          <span className="text-sm font-medium">100+ industries supported</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
