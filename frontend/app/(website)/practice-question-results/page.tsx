"use client";
import React, { Suspense } from "react";

import Loading from "@/components/website/Loading";

import PracticeQuestionResultInner from "@/components/website/PracticeQuestionResultInner";

const PracticeQuestionResult = () => {
  return (
    <Suspense fallback={<Loading message="Loading, please wait..." />}>
      <PracticeQuestionResultInner />
    </Suspense>
  );
};

export default PracticeQuestionResult;
