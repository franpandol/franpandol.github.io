import React from "react";
import PageHeader from "../components/PageHeader";
import { ExperienceContent } from "../components/ExperienceSection";

const ExperiencePage = () => (
  <main className="w-full">
    <PageHeader
      title="Experience"
      description="System design, architecture, scalability, and leadership — marketplaces, fintech, and high-traffic backends (including the Mercado Libre ecosystem at RealTrends)."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem]">
        <ExperienceContent />
      </div>
    </div>
  </main>
);

export default ExperiencePage;
