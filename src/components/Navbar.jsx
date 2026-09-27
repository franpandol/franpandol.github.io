import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const linkClass =
  "text-sm text-content-secondary underline-offset-4 hover:text-accent hover:underline";
const navLinkClass = ({ isActive }) =>
  `${linkClass} ${isActive ? "font-medium text-accent" : ""}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-white/85 backdrop-blur-md">
      <nav className="w-full px-6 py-4 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="order-1 flex items-center gap-2 font-display text-base font-semibold text-content-primary hover:text-accent md:text-lg"
            onClick={() => setOpen(false)}
          >
            <img src="/logo-mark.svg" alt="" aria-hidden="true" className="h-7 w-7" />
            {t("nav.brand")}
          </Link>
          <div className="order-2 flex items-center gap-2 md:order-3">
            <LanguageSwitcher />
            <button
              type="button"
              className="rounded border border-surface-border px-3 py-1.5 text-sm text-content-secondary hover:border-accent-muted hover:text-accent md:hidden"
              aria-expanded={open}
              aria-label={t("common.toggleMenu")}
              onClick={() => setOpen((o) => !o)}
            >
              {t("common.menu")}
            </button>
          </div>
          <div
            className={`order-3 w-full flex-col gap-2 border-t border-surface-border pt-4 md:order-2 md:flex md:w-auto md:flex-1 md:justify-center md:border-t-0 md:pt-0 ${
              open ? "flex" : "hidden"
            } md:flex md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-1`}
          >
            <NavLink to="/experience" className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.experience")}
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.about")}
            </NavLink>
            <NavLink to="/skills" className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.skills")}
            </NavLink>
            <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.projects")}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.contact")}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
