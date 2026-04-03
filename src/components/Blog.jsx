import React from "react";
import PageHeader from "./PageHeader";

const blogs = [
  {
    id: 1,
    title: "Django: From zero to your first job",
    summary:
      "A practical path into Django and how to position yourself for a first backend role — focused on fundamentals and delivery.",
    url: "https://learningblogs.ue.r.appspot.com/posts/",
  },
];

const linkClass =
  "text-sm text-accent-muted underline-offset-4 hover:text-accent hover:underline";

const Blog = () => (
  <main className="w-full">
    <PageHeader
      title="Writing"
      description="Occasional notes on backend engineering and career growth."
    />
    <div className="w-full border-t border-surface-border px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <ul className="mx-auto max-w-[90rem] divide-y divide-surface-border border-t border-surface-border">
        {blogs.map((blog) => (
          <li key={blog.id} className="py-8 md:py-10">
            <a href={blog.url} target="_blank" rel="noopener noreferrer" className="group block">
              <h2 className="text-lg font-semibold text-content-primary group-hover:text-accent md:text-xl">
                {blog.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary md:text-[15px]">
                {blog.summary}
              </p>
              <span className={`${linkClass} mt-4 inline-block`}>Read article</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default Blog;
