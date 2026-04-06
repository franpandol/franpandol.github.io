import React from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "./PageHeader";

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

const Blog = () => {
  const { t } = useTranslation();
  const blogs = [
    {
      id: 1,
      url: "https://learningblogs.ue.r.appspot.com/posts/",
      i18nKey: "djangoZero",
    },
  ];

  return (
    <main className="w-full">
      <PageHeader title={t("blogs.page.title")} description={t("blogs.page.description")} />
      <div className="w-full px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-10 lg:px-16">
        <ul className="mx-auto max-w-[90rem] divide-y divide-surface-border">
          {blogs.map((blog) => (
            <li key={blog.id} className="py-8 md:py-10">
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="group block">
                <h2 className="text-lg font-semibold text-content-primary group-hover:text-accent md:text-xl">
                  {t(`blogs.${blog.i18nKey}.title`)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
                  {t(`blogs.${blog.i18nKey}.summary`)}
                </p>
                <span className={`${linkClass} mt-4 inline-block`}>{t("blogs.readArticle")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Blog;
