import React from "react";

import HeroSection from "./home-hero";
import Features from "./features";
import Footer from "./footer";
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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomeItems;
