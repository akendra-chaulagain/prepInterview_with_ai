"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BookCopyIcon } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const { userId } = useAuth();
  const [role, setRole] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const handleStartInterview = (interviewType: string) => {
    if (!technology || !role || !level) {
      return setError("Please fill in all required fields before proceeding.");
    }

    router.push(
      `/practice-questions/questions?user=${userId}&technology=${technology}&interviewType=${interviewType}&jobRole=${role}&difficulty=${level}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm border border-red-100 shadow-2xl rounded-3xl p-10 relative overflow-hidden">
        <div className="text-center pb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <BookCopyIcon className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Start General Interview
          </h1>
          <p className="text-slate-600">
            Configure your general interview parameters
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-3">
            <Label
              htmlFor="tech-role"
              className="text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Job Position
            </Label>
            <Input
              onChange={(e) => setRole(e.target.value)}
              id="tech-role"
              name="jobRole"
              placeholder="Marketing Specialist, Sales Rep..."
              className="h-12 border-slate-200 rounded-xl focus:border-red-600 focus:ring-red-600/20 bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="tech-stack"
              className="text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Industry Sector
            </Label>
            <Input
              onChange={(e) => setTechnology(e.target.value)}
              name="technology"
              id="tech-stack"
              placeholder="Technology, Healthcare, Finance..."
              className="h-12 border-slate-200 rounded-xl focus:border-red-600 focus:ring-red-600/20 bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="tech-difficulty"
              className="text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Interview Focus <span className="text-red-600 text-lg">*</span>
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

        <span className="text-red-600 ml-1 text-sm block mt-3 relative z-10">
          {error}
        </span>

        <div className="pt-8 relative z-10">
          <Button
            onClick={() => handleStartInterview("general")}
            className=" w-full cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
          >
            Begin Interview →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
