import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import { ExperienceContent } from "../components/ExperienceSection";

const ExperiencePage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("experience.page.title")} description={t("experience.page.description")} />
      <div className="w-full px-6 pb-12 pt-6 md:px-12 md:pb-16 md:pt-8 lg:px-16">
        <div className="max-w-[90rem]">
          <ExperienceContent />
        </div>
      </div>
    </main>
  );
};

export default ExperiencePage;
