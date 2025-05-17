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
        <h2 className="text-4xl font-extrabold mb-3">Practice Questions</h2>
        <p className="text-lg max-w-2xl text-gray-200">
          Prepare effectively with a rich set of curated practice questions
          designed to simulate real-world interview scenarios. Our question bank
          includes a balanced mix of <strong>technical</strong>,{" "}
          <strong>behavioral</strong>, and <strong>general</strong> questions
          that adapt to your job role, skill level, and goals.
        </p>
      </div>

      {/* Practice Question Types Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-10">
          Practice Question Types
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* General */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-yellow-500 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">General</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Strengthen your overall readiness with questions about work
                ethic, career motivation, personal goals, and workplace
                adaptability.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-auto w-full">Start Interview</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Start General Interview</DialogTitle>
                  <DialogDescription>
                    Fill in the details to begin your general mock interview.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="general-role">Job Role</Label>
                    <Input
                      id="general-role"
                      placeholder="e.g., Marketing Specialist"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="general-industry">Industry</Label>
                    <Input
                      id="general-industry"
                      placeholder="e.g., E-commerce"
                    />
                  </div>
                  {/* difficulty level */}
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
                  <Button type="submit">Start</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {/* Behavioral */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-green-500 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Behavioral
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Prepare for real-world scenarios using STAR-based questions that
                test your communication, leadership, and decision-making skills.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-auto w-full">Start Interview</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Start Behavioral Interview</DialogTitle>
                  <DialogDescription>
                    Fill in the details to begin your behavioral mock interview.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="behavior-role">Job Role</Label>
                    <Input
                      id="behavior-role"
                      placeholder="e.g., Project Manager"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="behavior-experience">
                      Experience Level
                    </Label>
                    <Input
                      id="behavior-experience"
                      placeholder="e.g., 2 years"
                    />
                  </div>
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
                  <Button type="submit">Start</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Technical */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-blue-500 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Technical
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Assess your coding, system design, and problem-solving skills
                with domain-specific technical questions tailored to your
                expertise.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-auto w-full">Start interview</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Start Technical Interview</DialogTitle>
                  <DialogDescription>
                    Fill in the details to begin your technical mock interview.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tech-role">Job Role</Label>
                    <Input
                      id="tech-role"
                      placeholder="e.g., Backend Developer"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tech-stack">Technology</Label>
                    <Input
                      id="tech-stack"
                      placeholder="e.g., Node.js, MongoDB"
                    />
                  </div>
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
                  <Button type="submit">Start</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;
