import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { SelectedWorkContent } from "../components/SelectedWorkPreview";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

const WorkPage = () => (
  <main className="w-full">
    <PageHeader
      title="Selected work"
      description="Representative backend work with public repositories — problem, solution, impact, and stack."
    >
      <p className="mt-6">
        <Link to="/projects" className={linkClass}>
          Browse all projects →
        </Link>
      </p>
    </PageHeader>
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem]">
        <SelectedWorkContent />
      </div>
    </div>
  </main>
);

export default WorkPage;
