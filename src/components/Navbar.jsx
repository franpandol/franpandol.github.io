import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const linkClass =
  "text-sm text-content-secondary underline-offset-4 hover:text-accent hover:underline";
const navLinkClass = ({ isActive }) =>
  `${linkClass} ${isActive ? "font-medium text-accent" : ""}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-12 lg:px-16">
        <Link
          to="/"
          className="font-display text-base font-semibold text-content-primary hover:text-accent md:text-lg"
          onClick={() => setOpen(false)}
        >
          Francisco Pandol
        </Link>
        <button
          type="button"
          className="rounded border border-surface-border px-3 py-1.5 text-sm text-content-secondary hover:border-accent-muted hover:text-accent md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <div
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 border-t border-surface-border pt-4 md:flex md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-1 md:border-t-0 md:pt-0`}
        >
          <NavLink to="/experience" className={navLinkClass} onClick={() => setOpen(false)}>
            Experience
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/skills" className={navLinkClass} onClick={() => setOpen(false)}>
            Skills
          </NavLink>
          <NavLink to="/work" className={navLinkClass} onClick={() => setOpen(false)}>
            Selected work
          </NavLink>
          <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>
            All projects
          </NavLink>
          <NavLink to="/blogs" className={navLinkClass} onClick={() => setOpen(false)}>
            Writing
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
