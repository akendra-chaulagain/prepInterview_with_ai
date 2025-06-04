import React from "react";

import HeroSection from "./home-hero";
import Features from "./features";

import HowItWork from "./work";

const HomeItems = () => {
  return (
    <>
      {/* Hero Section with Background */}
      <HeroSection />

      {/* Features Section */}
      <Features />
      {/* How It Works Section */}
      <HowItWork />

    
    </>
  );
};

export default HomeItems;
