
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import Loading from "@/components/website/Loading";
import MockInterviewInner from "@/components/website/MockInterviewInner";

export default function Page() {
  return (
    <Suspense fallback={<Loading message="Preparing your interview..." />}>
      <MockInterviewInner />
    </Suspense>
  );
}
