import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Section, { sectionTitleClass } from "./Section";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import SelectedWorkPreview from "./SelectedWorkPreview";
import ContactSection from "./ContactSection";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) {
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <ExperienceSection />
      <Section id="about">
        <h2 className={sectionTitleClass}>About</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-content-secondary">
          <p>
            I am <strong className="font-medium text-content-primary">Francisco Pandol</strong> — a{" "}
            <strong className="font-medium text-content-primary">
              Software Project Leader and Backend Tech Lead
            </strong>{" "}
            with <strong className="font-medium text-content-primary">over ten years</strong>{" "}
            owning architecture and delivery in{" "}
            <strong className="font-medium text-content-primary">
              fintech, real-time systems, and marketplace-scale backends
            </strong>
            . I lead with{" "}
            <strong className="font-medium text-content-primary">
              Python, Django, and FastAPI
            </strong>
            , and I am comfortable making the calls that affect scalability, latency, and operational
            safety — the same profile that matters for large product and payments platforms.
          </p>
          <p>
            I have led teams on the{" "}
            <strong className="font-medium text-content-primary">Mercado Libre ecosystem</strong>{" "}
            (RealTrends), shipped exchange-grade backends with custody and KYC integrations, and
            improved platform performance at scale (including significant gains on wealth-management
            workloads). I stay close to code and reviews while aligning engineering with business
            outcomes.
          </p>
        </div>
      </Section>
      <SkillsSection />
      <SelectedWorkPreview />
      <ContactSection />
    </main>
  );
};

export default Home;
