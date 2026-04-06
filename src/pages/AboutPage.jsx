import React from "react";
import { Trans, useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";

const strongClass = "font-medium text-content-primary";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full">
      <PageHeader title={t("about.page.title")} description={t("about.page.description")} />
      <div className="w-full px-6 pb-12 pt-6 md:px-12 md:pb-16 md:pt-8 lg:px-16">
        <div className="max-w-[90rem] space-y-6 text-sm leading-relaxed text-content-secondary md:text-[15px] md:leading-[1.7]">
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
            <Trans
              i18nKey="about.p2"
              components={[<strong key="s1" className={strongClass} />]}
            />
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
