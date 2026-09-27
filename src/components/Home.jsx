import React from "react";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import FeaturedProjects from "./FeaturedProjects";
import LandingNav from "./LandingNav";

const Home = () => (
  <main className="w-full">
    <Hero />
    <AboutSection />
    <FeaturedProjects />
    <LandingNav />
  </main>
);

export default Home;
