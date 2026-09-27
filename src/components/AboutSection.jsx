import React from "react";
import { Trans, useTranslation } from "react-i18next";

const strongClass = "font-medium text-content-primary";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 pb-4 pt-2 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-[90rem]">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-muted">
          {t("landing.about.title")}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-content-secondary md:leading-[1.7]">
          <p>
            <Trans
              i18nKey="about.p1"
              components={[
                <strong key="s1" className={strongClass} />,
                <strong key="s2" className={strongClass} />,
                <strong key="s3" className={strongClass} />,
                <strong key="s4" className={strongClass} />,
                <strong key="s5" className={strongClass} />,
              ]}
            />
          </p>
          <p>
            <Trans i18nKey="about.p2" components={[<strong key="s1" className={strongClass} />]} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
