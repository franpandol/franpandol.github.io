import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import { ContactContent } from "../components/ContactSection";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("contact.page.title")} description={t("contact.page.description")} />
      <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="max-w-[90rem]">
          <ContactContent />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
