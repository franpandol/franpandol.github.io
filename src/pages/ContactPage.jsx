import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import RecruiterInterviewCta from "../components/RecruiterInterviewCta";
import { ContactContent } from "../components/ContactSection";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("contact.page.title")} description={t("contact.page.description")} />
      <div className="w-full px-6 pb-12 pt-6 md:px-12 md:pb-16 md:pt-8 lg:px-16">
        <div className="mx-auto max-w-[90rem]">
          <div className="max-w-3xl">
            <RecruiterInterviewCta />
            <ContactContent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
