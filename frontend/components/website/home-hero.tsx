import { LaptopMinimalCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white lg:mt-10">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mb-6 text-center">
            Interview <span className="text-red-400">Copilot</span>
          </h1>
          <p className="max-w-1xl mx-auto text-xl text-gray-300 text-center mb-10">
            Your real-time AI partner for interview success. Get personalized
            support, expert guidance, and confidence-boosting preparation for
            your next opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={"/mock-interview"}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg flex items-center"
            >
              <LaptopMinimalCheckIcon className="w-5 h-5 mr-2" />
              Start Practicing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
