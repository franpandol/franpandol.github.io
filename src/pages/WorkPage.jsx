import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import { SelectedWorkContent } from "../components/SelectedWorkPreview";

const linkClass = "text-sm text-accent underline-offset-4 hover:underline";

const WorkPage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("work.page.title")} description={t("work.page.description")}>
        <p className="mt-6">
          <Link to="/projects" className={linkClass}>
            {t("work.browseAll")}
          </Link>
        </p>
      </PageHeader>
      <div className="w-full px-6 pb-12 pt-6 md:px-12 md:pb-16 md:pt-8 lg:px-16">
        <div className="max-w-[90rem]">
          <SelectedWorkContent />
        </div>
      </div>
    </main>
  );
};

export default WorkPage;
