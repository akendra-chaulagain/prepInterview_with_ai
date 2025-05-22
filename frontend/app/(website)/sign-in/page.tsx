"use client";
import { SignIn } from "@clerk/nextjs";


export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Clerk SignIn component */}
      <SignIn 
        // path="/sign-in"
        // routing="path"
        // signUpUrl="/sign-up"
        // appearance={appearance}
        // localization={localization}
        signUpUrl="/sign-up"

      
      />
    </div>
  );
}
