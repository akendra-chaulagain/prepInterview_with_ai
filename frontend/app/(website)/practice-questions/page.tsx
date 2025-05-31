"use client";
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
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const [role, setRole] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  // summit the fom and redirect the interview page
  const handleStartInterview = (interviewType: string) => {
    if (!technology || !role || !level) {
      return setError("Please fill in all required fields before proceeding.");
    }

    router.push(
      `/practice-questions/questions?user=${userId}&technology=${technology}&interviewType=${interviewType}&jobRole=${role}&difficulty=${level}`
    );
  };
  // alert(error);
  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-red-700 to-red-500 text-white px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Practice Questions</h2>
        <p className="text-lg max-w-2xl text-gray-100">
          Master your interview skills with our comprehensive question bank.
          Featuring technical assessments, behavioral scenarios, and general
          inquiries tailored to your specific role and experience level.
        </p>
      </div>
      {/* Hero Section */}

      {/* Main Content */}
      <section className="max-w-1xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Choose Your Interview Type
          </h2>
          <p className="text-slate-600">
            Select the category that matches your preparation needs
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Technical Interview */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-red-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <svg
                  className="w-6 h-6 text-slate-600 group-hover:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                TECHNICAL
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Technical Interview
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Comprehensive coding challenges, system design questions, and
              technology-specific assessments to evaluate your technical
              expertise.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Start Technical Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
                <DialogHeader className="text-left pb-6">
                  <DialogTitle className="text-xl font-semibold text-slate-900">
                    Technical Interview Setup
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Configure your technical interview parameters
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tech-role"
                      className="text-sm font-medium text-slate-700"
                    >
                      Position
                    </Label>
                    <Input
                      onChange={(e) => setRole(e.target.value)}
                      id="tech-role"
                      name="jobRole"
                      placeholder="Backend Developer, Frontend Engineer..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tech-stack"
                      className="text-sm font-medium text-slate-700"
                    >
                      Technology Stack
                    </Label>
                    <Input
                      onChange={(e) => setTechnology(e.target.value)}
                      name="technology"
                      id="tech-role"
                      placeholder="React, Node.js, Python, AWS..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tech-difficulty"
                      className="text-sm font-medium text-slate-700"
                    >
                      Difficulty Level <span className="text-red-600">*</span>
                    </Label>
                    <select
                      name="difficulty"
                      onChange={(e) => setLevel(e.target.value)}
                      id="tech-difficulty"
                      className="w-full h-11 border border-slate-200 rounded-lg px-3 bg-white focus:border-red-600 focus:ring-red-600/20"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select difficulty
                      </option>
                      <option value="junior">Junior Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                    </select>
                  </div>
                </div>
                <span className="text-red-600 ml-[4px] text-sm"> {error}</span>

                <DialogFooter className="pt-6">
                  <Button
                    onClick={() => handleStartInterview("technical")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg"
                  >
                    Begin Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Behavioral Interview */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-red-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <svg
                  className="w-6 h-6 text-slate-600 group-hover:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                BEHAVIORAL
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Behavioral Interview
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              STAR methodology questions focusing on leadership, teamwork,
              problem-solving, and communication skills from real scenarios.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Start Behavioral Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
                <DialogHeader className="text-left pb-6">
                  <DialogTitle className="text-xl font-semibold text-slate-900">
                    Behavioral Interview Setup
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Configure your behavioral interview parameters
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="behavior-role"
                      className="text-sm font-medium text-slate-700"
                    >
                      Target Role
                    </Label>
                    <Input
                      onChange={(e) => setRole(e.target.value)}
                      name="jobRole"
                      id="behavior-role"
                      placeholder="Product Manager, Team Lead..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="behavior-experience"
                      className="text-sm font-medium text-slate-700"
                    >
                      Years of Experience
                    </Label>
                    <Input
                      name="technology"
                      onChange={(e) => setTechnology(e.target.value)}
                      id="behavior-experience"
                      placeholder="0-2, 3-5, 5+ years..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="behavior-difficulty"
                      className="text-sm font-medium text-slate-700"
                    >
                      Interview Level <span className="text-red-600">*</span>
                    </Label>
                    <select
                      name="difficulty"
                      onChange={(e) => setLevel(e.target.value)}
                      id="behavior-difficulty"
                      className="w-full h-11 border border-slate-200 rounded-lg px-3 bg-white focus:border-red-600 focus:ring-red-600/20"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select level
                      </option>
                      <option value="entry">Entry Level</option>
                      <option value="experienced">Experienced</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </div>
                </div>

                <DialogFooter className="pt-6">
                  <Button
                    onClick={() => handleStartInterview("behavioral")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg"
                  >
                    Begin Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* General Interview */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-red-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <svg
                  className="w-6 h-6 text-slate-600 group-hover:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01-.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                GENERAL
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              General Interview
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Fundamental interview questions covering motivation, career goals,
              company culture fit, and professional development aspirations.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Start General Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
                <DialogHeader className="text-left pb-6">
                  <DialogTitle className="text-xl font-semibold text-slate-900">
                    General Interview Setup
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Configure your general interview parameters
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="general-role"
                      className="text-sm font-medium text-slate-700"
                    >
                      Job Position
                    </Label>
                    <Input
                      onChange={(e) => setRole(e.target.value)}
                      id="general-role"
                      name="jobRole"
                      placeholder="Marketing Specialist, Sales Rep..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="general-industry"
                      className="text-sm font-medium text-slate-700"
                    >
                      Industry Sector
                    </Label>
                    <Input
                      onChange={(e) => setTechnology(e.target.value)}
                      id="general-industry"
                      name="technology"
                      placeholder="Technology, Healthcare, Finance..."
                      className="h-11 border-slate-200 rounded-lg focus:border-red-600 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="general-difficulty"
                      className="text-sm font-medium text-slate-700"
                    >
                      Interview Focus <span className="text-red-600">*</span>
                    </Label>
                    <select
                      id="general-difficulty"
                      onChange={(e) => setLevel(e.target.value)}
                      name="difficulty"
                      className="w-full h-11 border border-slate-200 rounded-lg px-3 bg-white focus:border-red-600 focus:ring-red-600/20"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select focus
                      </option>
                      <option value="culture">Culture Fit</option>
                      <option value="motivation">Motivation</option>
                      <option value="comprehensive">Comprehensive</option>
                    </select>
                  </div>
                </div>

                <DialogFooter className="pt-6">
                  <Button
                    onClick={() => handleStartInterview("general")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg"
                  >
                    Begin Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8">
            Trusted by Professionals Worldwide
          </h3>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">2,500+</div>
              <div className="text-sm text-slate-600 font-medium">
                Practice Questions
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">150+</div>
              <div className="text-sm text-slate-600 font-medium">
                Job Categories
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600">98%</div>
              <div className="text-sm text-slate-600 font-medium">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
