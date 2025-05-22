import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <UserProfile
        appearance={{
          variables: {
            colorPrimary: "#E90012",
            fontSize: "16px",
            borderRadius: "1px",
            spacingUnit: "19px",
            fontFamily: "Inter, sans-serif",
          },
        }}
        path="/profile"
        routing="path"
      />
    </div>
  );
};

export default Page;
