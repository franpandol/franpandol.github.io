import React from "react";
import { sectionTitleClass } from "./Section";

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
  "text-sm text-content-secondary underline-offset-4 hover:text-content-primary hover:underline";

const Blog = () => (
  <div className="px-6 pb-16 pt-8 md:px-8">
    <header className="border-b border-surface-border pb-8">
      <h1 className={sectionTitleClass}>Writing</h1>
      <p className="mt-4 text-sm leading-relaxed text-content-secondary">
        Occasional notes on backend engineering and career growth.
      </p>
    </header>
    <ul className="divide-y divide-surface-border border-t border-surface-border">
      {blogs.map((blog) => (
        <li key={blog.id} className="py-8">
          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="group block">
            <h2 className="text-base font-semibold text-content-primary group-hover:underline">
              {blog.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{blog.summary}</p>
            <span className={`${linkClass} mt-3 inline-block`}>Read article</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;
