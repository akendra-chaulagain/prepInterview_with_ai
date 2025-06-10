"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Award,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/hooks/toast";

const Page = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const [role, setRole] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();

  // summit the fom and redirect the interview Page
  const handleStartInterview = (interviewType: string) => {
    if (!technology || !role || !level) {
      return setError(
        "Please select all the data in all required fields before proceeding."
      );
    }

    if (!user) {
      showErrorToast("You must be signed in to continue.");
      return router.push("/sign-in");
    }

    router.push(
      `/practice-questions/questions?user=${userId}&technology=${technology}&interviewType=${interviewType}&jobRole=${role}&difficulty=${level}`
    );
  };

  const features = [
    { icon: Target, text: "Targeted behavioral scenarios" },
    { icon: Users, text: "Real-world team situations" },
    { icon: TrendingUp, text: "Progressive difficulty levels" },
    { icon: Award, text: "Industry-standard questions" },
  ];

  const experienceLevels = [
    { value: "0-2", label: "0-2 years", desc: "New to the field" },
    { value: "3-5", label: "3-5 years", desc: "Growing expertise" },
    { value: "5-8", label: "5-8 years", desc: "Senior experience" },
    { value: "8+", label: "8+ years", desc: "Leadership ready" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Information */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Behavioral Interview Practice
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Master Your
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  {" "}
                  Behavioral
                </span>
                <br />
                Interview Skills
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed">
                Practice real-world scenarios and behavioral questions tailored
                to your role and experience level. Build confidence with our
                AI-powered interview simulation.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-red-100 hover:border-red-200 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-500">
              <p>
                Note:
                <span className="text-red-600  ml-[3px] font-medium">
                  This is a practice session. Your responses will be saved or
                  evaluated.
                </span>{" "}
              </p>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-red-100 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
              {/* Form Header */}
              <div className="text-center pb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Brain className="text-white w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Behavioral Interview Setup
                </h2>
                <p className="text-slate-600 text-sm">
                  Customize your practice session
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Target Role */}
                <div className="space-y-3">
                  <Label
                    htmlFor="tech-role"
                    className="text-sm font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Target Role
                  </Label>
                  <Input
                    onChange={(e) => setRole(e.target.value)}
                    id="tech-role"
                    name="jobRole"
                    placeholder="Product Manager, Team Lead..."
                    className="h-12 border-slate-200 rounded-xl focus:border-red-600 focus:ring-red-600/20 bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-500"
                  />

                  {/* Popular Roles */}
                </div>

                {/* Years of Experience */}
                <div className="space-y-3">
                  <Label
                    htmlFor="tech-stack"
                    className="text-sm font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Years of Experience
                  </Label>

                  <div className="grid grid-cols-2 gap-3">
                    {experienceLevels.map((exp, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setTechnology(exp.value)}
                        className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                          technology === exp.value
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-slate-200 bg-white/70 hover:border-red-300 hover:bg-red-50"
                        }`}
                      >
                        <div className="font-medium text-sm">{exp.label}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {exp.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Level */}
                <div className="space-y-3">
                  <Label
                    htmlFor="tech-difficulty"
                    className="text-sm font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Difficulty Level{" "}
                    <span className="text-red-600 text-lg">*</span>
                  </Label>

                  <div className="space-y-2">
                    {[
                      {
                        value: "entry",
                        label: "Entry Level",
                        desc: "Basic behavioral scenarios",
                        icon: "🌱",
                      },
                      {
                        value: "experienced",
                        label: "Experienced",
                        desc: "Complex situations & leadership",
                        icon: "🚀",
                      },
                      {
                        value: "leadership",
                        label: "Leadership",
                        desc: "Strategic & executive scenarios",
                        icon: "👑",
                      },
                    ].map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          level === option.value
                            ? "border-red-600 bg-red-50"
                            : "border-slate-200 bg-white/70 hover:border-red-300 hover:bg-red-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          value={option.value}
                          onChange={(e) => setLevel(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="font-medium text-slate-900">
                              {option.label}
                            </div>
                            <div className="text-sm text-slate-600">
                              {option.desc}
                            </div>
                          </div>
                        </div>
                        {level === option.value && (
                          <CheckCircle className="w-5 h-5 text-red-600" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm relative z-10">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-6 relative z-10">
                <Button
                  onClick={() => handleStartInterview("behavioral")}
                  className="w-full cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg group"
                >
                  Begin Interview
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Decorative Elements */}
            </div>

            {/* Trust Indicators */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
