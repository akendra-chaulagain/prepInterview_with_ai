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
import { useRouter } from "next/navigation";
import {
  Book,
  BookOpenCheck,
  CheckSquare,
  CircleCheck,
  Star,
  Zap,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { showErrorToast } from "@/hooks/toast";

const Page = () => {
  const router = useRouter();
  const [technology, setTechnology] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, seterror] = useState("");
  const { user } = useUser();

  const handleStartInterview = () => {
    if (!technology || !interviewType || !jobRole || !difficulty) {
      seterror("Please fill in all required fields before proceeding.");
      return;
    }
    if (!user) {
      showErrorToast("You must be signed in to continue.");
      return router.push("/sign-in");
    }
    router.push(
      `/mock-interview/interview?technology=${technology}&interviewType=${interviewType}&jobRole=${jobRole}&difficulty=${difficulty}`
    );
  };

  const features = [
    {
      icon: <CircleCheck />,
      title: "Smart Analysis",
      description:
        "AI-powered feedback on clarity, confidence, and structure of your responses",
    },
    {
      icon: <Zap />,
      title: "Real-time Feedback",
      description:
        "Instant insights and suggestions to improve your interview performance",
    },
    {
      icon: <BookOpenCheck />,
      title: "Personalized Questions",
      description:
        "30 carefully curated questions tailored to your role and experience level",
    },
  ];

  const benefits = [
    "STAR-based storytelling techniques",
    "Technical accuracy assessment",
    "Communication effectiveness scoring",
    "Professional confidence building",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Keep original */}
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-red-700 to-red-500 text-white px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-3">Mock Interview</h2>
        <p className="text-lg max-w-2xl text-gray-100">
          Sharpen your interview skills with our AI-powered mock interviews.
          Practice real-time behavioral and technical questions tailored to your
          role.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-1xl mx-auto py-16 px-6">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - What to Expect */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  What to Expect
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Experience a comprehensive mock interview session with{" "}
                  <span className="font-semibold text-red-600">
                    30 targeted questions
                  </span>{" "}
                  designed to simulate real interview scenarios.
                </p>

                <div className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl p-6 border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="text-red-600" />
                    AI-Powered Assessment
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckSquare className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Perfect for Everyone
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Whether you&apos;re a first-time job seeker or an
                        experienced professional, our adaptive system provides
                        personalized feedback to help you excel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Get Started */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Start?
                </h3>
                <p className="text-red-100">
                  Begin your personalized mock interview experience
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>30 curated questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Real-time AI feedback</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Personalized experience</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                      Start Your Interview
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl">
                    <DialogHeader className="text-center pb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Customize Your Interview
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 mt-2">
                        Tell us about your background to get the most relevant
                        questions
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="jobRole"
                            className="text-sm font-medium text-gray-700"
                          >
                            Job Role <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="jobRole"
                            placeholder="Software Engineer"
                            className="border-gray-300 focus:border-red-500 focus:ring-red-500/20 rounded-lg"
                            onChange={(e) => setJobRole(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="technology"
                            className="text-sm font-medium text-gray-700"
                          >
                            Technology <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="technology"
                            placeholder="React, Python"
                            className="border-gray-300 focus:border-red-500 focus:ring-red-500/20 rounded-lg"
                            onChange={(e) => setTechnology(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="interviewType"
                            className="text-sm font-medium text-gray-700"
                          >
                            Interview Type{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <select
                            id="interviewType"
                            onChange={(e) => setInterviewType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg h-11 px-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select type
                            </option>
                            <option value="general">General</option>
                            <option value="behavioral">Behavioral</option>
                            <option value="technical">Technical</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="difficulty"
                            className="text-sm font-medium text-gray-700"
                          >
                            Difficulty <span className="text-red-500">*</span>
                          </Label>
                          <select
                            id="difficulty"
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg h-11 px-3 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select level
                            </option>
                            <option value="easy">Beginner</option>
                            <option value="medium">Intermediate</option>
                            <option value="hard">Advanced</option>
                          </select>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-600 text-sm font-medium">
                            {error}
                          </p>
                        </div>
                      )}
                    </div>

                    <DialogFooter className="pt-6">
                      <Button
                        onClick={handleStartInterview}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Launch Interview Session
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Takes approximately 45-60 minutes to complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
