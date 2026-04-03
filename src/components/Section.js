import React from "react";

const Section = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`scroll-mt-24 py-16 md:py-24 border-t border-surface-border first:border-t-0 first:pt-8 md:first:pt-12 ${className}`}
  >
    <div className="mx-auto max-w-3xl px-5 md:px-6 lg:max-w-4xl">{children}</div>
  </section>
);

export default Section;
