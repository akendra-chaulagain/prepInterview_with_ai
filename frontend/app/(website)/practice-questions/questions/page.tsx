"use client";

import Loading from "@/components/website/Loading";
import PracticeQuestionInner from "@/components/website/PracticeQuestionInner";

import React, { Suspense } from "react";

const PracticeQuestionSession = () => {
  return (
    <Suspense fallback={<Loading message="Loading, please wait..." />}>
      <PracticeQuestionInner />
    </Suspense>
  );
};

export default PracticeQuestionSession;
