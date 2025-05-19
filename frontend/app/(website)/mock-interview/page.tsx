"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [technology, setTechnology] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, seterror] = useState("");
  const handleStartInterview = () => {
    if (!technology || !interviewType || !jobRole || !difficulty) {
      seterror("Please fill in all required fields before proceeding.");
      return;
    }
    // Redirect to the interview page with the selected options
    // You can also use router.push if you are using Next.js router
    router.push(
      `/mock-interview/interview?technology=${technology}&interviewType=${interviewType}&jobRole=${jobRole}&difficulty=${difficulty}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with more vibrant red gradient */}
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-red-700 to-red-500 text-white px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Mock Interview</h2>
        <p className="text-lg max-w-2xl text-gray-100">
          Sharpen your interview skills with our AI-powered mock interviews.
          Practice real-time behavioral and technical questions tailored to your
          role.
        </p>
      </div>

      {/* Content Section - Added subtle red accents */}
      <div className="max-w-1xl mx-auto py-12 px-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-red-500 pl-3">
          What to Expect
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This mock interview session is designed to simulate a real interview
          environment and help you prepare with confidence. You&apos;ll receive
          a carefully curated set of{" "}
          <strong className="text-red-600">30 questions</strong>, combining{" "}
          <strong className="text-red-600">behavioral</strong>,
          <strong className="text-red-600">technical</strong>, and{" "}
          <strong className="text-red-600">general interview prompts</strong>{" "}
          tailored to your chosen job role and skill level.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Our system uses{" "}
          <strong className="text-red-600">AI-powered feedback</strong> to
          analyze your answers in real time, providing insights on:
        </p>

        <ul className="list-none text-gray-600 mb-6 space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span>
              <strong className="text-red-600">Clarity</strong> – How well you
              articulate your thoughts
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span>
              <strong className="text-red-600">Confidence</strong> – How assured
              and professional your responses sound
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span>
              <strong className="text-red-600">Structure</strong> – Whether your
              answers follow an effective and logical format
            </span>
          </li>
        </ul>

        <p className="text-gray-600 mb-6 leading-relaxed">
          You&apos;ll also receive suggestions to improve common interview
          metrics such as STAR-based storytelling, problem-solving
          communication, and technical accuracy. This tool is ideal for both{" "}
          <strong className="text-red-600">first-time job seekers</strong> and{" "}
          <strong className="text-red-600">experienced professionals</strong>{" "}
          preparing for their next big opportunity.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-gray-700 leading-relaxed">
            By the end of this session, you&apos;ll gain{" "}
            <strong className="text-red-500">deeper self-awareness</strong>,
            refine your communication, and feel better equipped to succeed in
            real interviews.
          </p>
        </div>

        {/* Start Button & Dialog - Changed to red theme */}
        <div className="text-center mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md shadow-md">
                Start Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-red-600">
                  Start Your Mock Interview
                </DialogTitle>
                <DialogDescription>
                  Fill in the following details to personalize your mock
                  interview experience.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Job Role */}
                <div className="grid gap-2">
                  <Label htmlFor="jobRole" className="text-gray-700">
                    Job Role <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="jobRole"
                    name="jobRole"
                    placeholder="e.g., Software Developer"
                    className="border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>

                {/* Technology */}
                <div className="grid gap-2">
                  <Label htmlFor="technology" className="text-gray-700">
                    Technology <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="technology"
                    placeholder="e.g., React, Node.js"
                    className="border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    onChange={(e) => setTechnology(e.target.value)}
                    name="technology"
                  />
                </div>

                {/* Interview Type */}
                <div className="grid gap-2">
                  <Label htmlFor="interviewType" className="text-gray-700">
                    Interview Type <span className="text-red-600">*</span>
                  </Label>
                  <select
                    id="interviewType"
                    name="interviewType"
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="border border-gray-300 rounded-md h-10 px-3 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option value="general">General</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                {/* Difficulty Level */}
                <div className="grid gap-2">
                  <Label htmlFor="difficulty" className="text-gray-700">
                    Difficulty Level <span className="text-red-600">*</span>
                  </Label>
                  <select
                    name="difficulty"
                    onChange={(e) => setDifficulty(e.target.value)}
                    id="difficulty"
                    className="border border-gray-300 rounded-md h-10 px-3 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select difficulty
                    </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <span className="text-red-600 font-semibold">{error}</span>

              <DialogFooter>
                <Button
                  onClick={handleStartInterview}
                  className="bg-red-600 cursor-pointer hover:bg-red-700"
                >
                  Start Interview
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
