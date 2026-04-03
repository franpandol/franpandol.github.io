import React from "react";

const PageHeader = ({ title, description, children }) => (
  <header className="border-b border-surface-border bg-gradient-to-b from-white to-surface px-6 py-12 md:px-12 md:py-16 lg:px-16">
    <div className="w-full max-w-[90rem]">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-content-primary md:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-content-secondary md:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  </header>
);

export default PageHeader;
