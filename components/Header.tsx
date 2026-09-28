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
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-3 px-1 py-3 sm:px-2">
        <a
          href="#home"
          className="shrink-0 text-sm font-semibold text-foreground sm:text-base"
        >
          {hero("name")}
        </a>
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          aria-label={a11y("mainNav")}
        >
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                active === id
                  ? "bg-lilac text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
              aria-current={active === id ? "true" : undefined}
            >
              {t(id)}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? a11y("closeMenu") : a11y("openMenu")}
            </span>
            <span aria-hidden="true" className="text-lg leading-none text-foreground">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="mx-auto mt-2 max-w-6xl rounded-[28px] border border-line bg-card px-4 py-3 shadow-[var(--shadow)] lg:hidden"
          aria-label={a11y("mainNav")}
        >
          <ul className="flex flex-col">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block min-h-11 rounded-full px-3 py-2 font-medium text-foreground"
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
