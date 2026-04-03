import React from "react";
import PageHeader from "../components/PageHeader";
import { SkillsContent } from "../components/SkillsSection";

const SkillsPage = () => (
  <main className="w-full">
    <PageHeader
      title="Skills"
      description="Backend, systems, cloud, and delivery — aligned with senior technical leadership roles."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem]">
        <SkillsContent />
      </div>
    </div>
  </main>
);

export default SkillsPage;
