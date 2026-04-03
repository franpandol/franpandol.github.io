import React from "react";
import PageHeader from "../components/PageHeader";
import { ContactContent } from "../components/ContactSection";

const ContactPage = () => (
  <main className="w-full">
    <PageHeader
      title="Contact"
      description="Open to Software Project Leader and Backend Tech Lead roles where system design, high concurrency, and technical ownership matter."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <div className="max-w-[90rem]">
        <ContactContent />
      </div>
    </div>
  </main>
);

export default ContactPage;
