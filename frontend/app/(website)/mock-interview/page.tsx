import React from "react";
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

const MockInterviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-gray-700 to-red-400 text-white px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Mock Interview</h2>
        <p className="text-lg max-w-2xl text-gray-200">
          Sharpen your interview skills with our AI-powered mock interviews.
          Practice real-time behavioral and technical questions tailored to your
          role.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-1xl mx-auto py-12 px-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          What to Expect
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          This mock interview session is designed to simulate a real interview
          environment and help you prepare with confidence. You’ll receive a
          carefully curated set of <strong>30 questions</strong>, combining{" "}
          <strong>behavioral</strong>,<strong>technical</strong>, and{" "}
          <strong>general interview prompts</strong> tailored to your chosen job
          role and skill level.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Our system uses <strong>AI-powered feedback</strong> to analyze your
          answers in real time, providing insights on:
        </p>

        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>
            <strong>Clarity</strong> – How well you articulate your thoughts
          </li>
          <li>
            <strong>Confidence</strong> – How assured and professional your
            responses sound
          </li>
          <li>
            <strong>Structure</strong> – Whether your answers follow an
            effective and logical format
          </li>
        </ul>

        <p className="text-gray-600 mb-6 leading-relaxed">
          You&apos;ll also receive suggestions to improve common interview
          metrics such as STAR-based storytelling, problem-solving
          communication, and technical accuracy. This tool is ideal for both
          <strong>first-time job seekers</strong> and{" "}
          <strong>experienced professionals</strong> preparing for their next
          big opportunity.
        </p>

        <p className="text-gray-600 leading-relaxed">
          By the end of this session, you’ll gain{" "}
          <strong>deeper self-awareness</strong>, refine your communication, and
          feel better equipped to succeed in real interviews.
        </p>

        {/* Start Button & Dialog */}
        <div className="text-center mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Start Interview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
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
                  <Label htmlFor="jobRole">
                    Job Role <span className="text-red-600">*</span>
                  </Label>
                  <Input id="jobRole" placeholder="e.g., Software Developer" />
                </div>

                {/* Technology */}
                <div className="grid gap-2">
                  <Label htmlFor="technology">
                    Technology <span className="text-red-600">*</span>
                  </Label>
                  <Input id="technology" placeholder="e.g., React, Node.js" />
                </div>

                {/* Interview Type */}
                <div className="grid gap-2">
                  <Label htmlFor="interviewType">
                    Interview Type <span className="text-red-600">*</span>
                  </Label>
                  <select
                    id="interviewType"
                    className="border border-gray-300 rounded-md h-12 px-3"
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
                  <Label htmlFor="difficulty">
                    Difficulty Level <span className="text-red-600">*</span>
                  </Label>
                  <select
                    id="difficulty"
                    className="border border-gray-300 rounded-md h-12 px-3"
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
              <DialogFooter>
                <Button type="submit">Start Interview</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;
