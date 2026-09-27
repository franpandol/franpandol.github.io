import React from "react";

const PageHeader = ({ title, description, children }) => (
  <header className="bg-gradient-to-b from-white to-surface px-6 pb-6 pt-10 md:px-12 md:pb-8 md:pt-14 lg:px-16">
    <div className="w-full max-w-[90rem]">
      <h1 className="font-display animate-fade-up text-3xl font-semibold tracking-tight text-content-primary md:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-3xl animate-fade-up text-[15px] leading-relaxed text-content-secondary opacity-0 [animation-delay:80ms] md:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  </header>
);

export default PageHeader;
