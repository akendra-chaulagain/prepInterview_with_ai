"use client";
import Loading from "@/components/website/Loading";
import { SignIn, useUser } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return <Loading message="Loading, please wait..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
