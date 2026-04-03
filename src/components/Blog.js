import React from "react";

const blogs = [
  {
    id: 1,
    title: "Django: From zero to your first job",
    summary:
      "A practical path into Django and how to position yourself for a first backend role — focused on fundamentals and delivery.",
    url: "https://learningblogs.ue.r.appspot.com/posts/",
  },
];

const Blog = () => (
  <div className="mx-auto max-w-3xl px-5 py-12 md:px-6 md:py-16">
    <header>
      <p className="font-mono text-sm text-accent">Writing</p>
      <h1 className="mt-2 font-display text-display-sm font-semibold text-content-primary">
        Articles
      </h1>
      <p className="mt-4 text-content-secondary leading-relaxed">
        Occasional long-form notes on backend engineering and career growth.
      </p>
    </header>
    <ul className="mt-12 space-y-8">
      {blogs.map((blog) => (
        <li key={blog.id}>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-surface-border bg-surface-raised p-6 shadow-card transition hover:border-stone-400"
          >
            <h2 className="text-lg font-semibold text-content-primary group-hover:text-accent">
              {blog.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">{blog.summary}</p>
            <span className="mt-4 inline-block font-mono text-xs text-content-tertiary">
              Read →
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;
