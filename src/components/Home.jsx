import React from "react";
import Hero from "./Hero";
import FeaturedProjects from "./FeaturedProjects";
import LandingNav from "./LandingNav";

const Home = () => (
  <main className="w-full">
    <Hero />
    <FeaturedProjects />
    <LandingNav />
  </main>
);

export default Home;
