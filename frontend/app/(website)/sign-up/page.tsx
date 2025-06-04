"use client"
import Loading from "@/components/website/Loading";
import { SignUp, useUser } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return <Loading message="Loading, please wait..." />;
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUp 
     
        signInUrl="/sign-in"
        appearance={{
          variables: {  
            colorPrimary: "#E90012",
            fontSize: "16px",
            borderRadius: "1px",
            spacingUnit: "19px",
            fontFamily: "Inter, sans-serif",
          },
          
        }}

       />

    </div>
  );
};

export default Page;
