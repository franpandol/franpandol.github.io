import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import { SkillsContent } from "../components/SkillsSection";

const SkillsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("skills.page.title")} description={t("skills.page.description")} />
      <div className="w-full px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-10 lg:px-16">
        <div className="max-w-[90rem]">
          <SkillsContent />
        </div>
      </div>
    </main>
  );
};

export default SkillsPage;
