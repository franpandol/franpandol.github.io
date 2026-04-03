import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import Hero from "./Hero";
import Section from "./Section";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import SelectedWorkPreview from "./SelectedWorkPreview";
import ContactSection from "./ContactSection";

const Home = () => {
  const posthog = usePostHog();
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

  const handleDownloadClick = (format) => {
    posthog?.capture("download_cv", { format });
  };

  return (
    <main>
      <Hero />
      <ExperienceSection />
      <Section id="about">
        <h2 className="font-display text-display-sm font-semibold text-content-primary">About</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-content-secondary">
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
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="/cv_markdown_en_Francisco_Pandol.md"
            download
            className="font-mono text-sm text-accent transition hover:text-content-primary"
            onClick={() => handleDownloadClick("markdown")}
          >
            Download CV (Markdown)
          </a>
          <span className="hidden text-content-tertiary sm:inline" aria-hidden>
            ·
          </span>
          <a
            href="/CV_en_Francisco_Pandol.pdf"
            download
            className="font-mono text-sm text-accent transition hover:text-content-primary"
            onClick={() => handleDownloadClick("pdf")}
          >
            Download CV (PDF)
          </a>
        </div>
      </Section>
      <SkillsSection />
      <SelectedWorkPreview />
      <ContactSection />
    </main>
  );
};

export default Home;
