"use client";

import React, { Suspense } from "react";

import Loading from "@/components/website/Loading";

import MockInterviewInner from "@/components/website/MockInterviewInner";

const MockInterview = () => {
  return (
    <Suspense fallback={<Loading message="Preparing your interview..." />}>
      <MockInterviewInner />
    </Suspense>
  );
};

export default MockInterview;
