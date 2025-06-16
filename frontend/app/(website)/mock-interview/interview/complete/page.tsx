"use client";
import React, { Suspense } from "react";

import Loading from "@/components/website/Loading";

import MockInterviewCompletePage from "@/components/website/MockInterviewCompletePageInner";

const MockInterviewCompleteSession = () => {
  return (
    <Suspense fallback={<Loading message="Loading, please wait..." />}>
      <MockInterviewCompletePage />
    </Suspense>
  );
};

export default MockInterviewCompleteSession;
