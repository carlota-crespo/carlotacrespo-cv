"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SECTION_IDS, type SectionId } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const hero = useTranslations("hero");
  const a11y = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 min-[1536px]:max-w-7xl min-[1920px]:max-w-[90rem]">
        <nav className="ml-auto hidden items-center gap-4 xl:flex" aria-label={a11y("mainNav")}>
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm transition-colors hover:text-ink ${
                active === id ? "font-medium text-ink" : "text-ink-soft"
              }`}
              aria-current={active === id ? "true" : undefined}
            >
              {t(id)}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-rose-deep px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal"
          >
            {hero("ctaContact")}
          </a>
          <LanguageSwitcher />
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-sand text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? a11y("closeMenu") : a11y("openMenu")}</span>
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-sand bg-background px-4 py-3 xl:hidden"
          aria-label={a11y("mainNav")}
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col min-[1536px]:max-w-7xl min-[1920px]:max-w-[90rem]">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block min-h-11 rounded-full px-3 py-2 font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {t(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
