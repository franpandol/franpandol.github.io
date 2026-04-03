import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinkBase =
  "text-sm font-medium text-content-tertiary transition hover:text-content-primary";
const navLinkActive = "text-content-primary";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const hashLinkClass = `${navLinkBase} block py-2 sm:py-0`;

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4 md:px-6">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-content-primary transition hover:text-accent"
          onClick={() => setOpen(false)}
        >
          Francisco Pandol
        </Link>
        <button
          type="button"
          className="rounded-lg border border-surface-border p-2 text-content-secondary sm:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
        <div
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-surface-border bg-surface px-5 py-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0`}
        >
          <Link to="/#experience" className={hashLinkClass} onClick={() => setOpen(false)}>
            Experience
          </Link>
          <Link to="/#about" className={hashLinkClass} onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/#key-projects" className={hashLinkClass} onClick={() => setOpen(false)}>
            Selected work
          </Link>
          <NavLink
            to="/projects"
            className={({ isActive }) => `${navLinkBase} block py-2 sm:py-0 ${isActive ? navLinkActive : ""}`}
            onClick={() => setOpen(false)}
          >
            Full selected work
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) => `${navLinkBase} block py-2 sm:py-0 ${isActive ? navLinkActive : ""}`}
            onClick={() => setOpen(false)}
          >
            Writing
          </NavLink>
          <Link
            to="/#contact"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-raised shadow-sm transition hover:bg-accent-muted sm:mt-0"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
