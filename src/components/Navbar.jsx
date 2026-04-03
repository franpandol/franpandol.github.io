import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const linkClass =
  "text-sm text-content-secondary underline-offset-4 hover:text-content-primary hover:underline";
const navLinkClass = ({ isActive }) =>
  `${linkClass} ${isActive ? "text-content-primary underline" : ""}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-surface-border bg-surface-raised/95 px-6 py-4 md:px-8">
      <nav className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="text-sm font-semibold text-content-primary hover:underline"
          onClick={() => setOpen(false)}
        >
          Francisco Pandol
        </Link>
        <button
          type="button"
          className="text-sm text-content-secondary underline md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <div
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 border-t border-surface-border pt-3 md:flex md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-1 md:border-t-0 md:pt-0`}
        >
          <Link to="/#experience" className={linkClass} onClick={() => setOpen(false)}>
            Experience
          </Link>
          <Link to="/#about" className={linkClass} onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/#skills" className={linkClass} onClick={() => setOpen(false)}>
            Skills
          </Link>
          <Link to="/#key-projects" className={linkClass} onClick={() => setOpen(false)}>
            Selected work
          </Link>
          <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>
            All projects
          </NavLink>
          <NavLink to="/blogs" className={navLinkClass} onClick={() => setOpen(false)}>
            Writing
          </NavLink>
          <Link to="/#contact" className={linkClass} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
