import React from "react";

export const sectionTitleClass =
  "text-xs font-semibold uppercase tracking-[0.14em] text-content-tertiary";

const Section = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`scroll-mt-20 border-t border-surface-border py-10 first:border-t-0 first:pt-0 md:py-12 ${className}`}
  >
    <div className="px-6 md:px-8">{children}</div>
  </section>
);

export default Section;
