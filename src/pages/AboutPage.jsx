import React from "react";
import PageHeader from "../components/PageHeader";

const AboutPage = () => (
  <main className="w-full">
    <PageHeader
      title="About"
      description="Background, focus areas, and how I work with product and platform teams."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem] space-y-6 text-sm leading-relaxed text-content-secondary md:text-[15px] md:leading-[1.7]">
        <p>
          I am <strong className="font-medium text-content-primary">Francisco Pandol</strong> — a{" "}
          <strong className="font-medium text-content-primary">
            Software Project Leader and Backend Tech Lead
          </strong>{" "}
          with <strong className="font-medium text-content-primary">over ten years</strong> owning
          architecture and delivery in{" "}
          <strong className="font-medium text-content-primary">
            fintech, real-time systems, and marketplace-scale backends
          </strong>
          . I lead with{" "}
          <strong className="font-medium text-content-primary">Python, Django, and FastAPI</strong>,
          and I am comfortable making the calls that affect scalability, latency, and operational
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
    </div>
  </main>
);

export default AboutPage;
