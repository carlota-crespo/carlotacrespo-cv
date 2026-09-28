"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/routing";

const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: "es", label: "ES" },
  { locale: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const t = useTranslations("a11y");
  const locale = useLocale();

  return (
    <div
      className="flex items-center rounded-full border border-sand bg-white/70 p-1 text-sm font-semibold tracking-wide"
      role="group"
      aria-label={t("languageSwitcher")}
    >
      {OPTIONS.map((option) => {
        const active = option.locale === locale;
        return (
          <Link
            key={option.locale}
            href="/"
            locale={option.locale}
            className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full px-2 ${
              active ? "bg-sand text-ink" : "text-ink-soft hover:text-ink"
            }`}
            aria-current={active ? "true" : undefined}
            aria-label={
              active ? `${t("activeLanguage")}: ${option.label}` : option.label
            }
            onClick={() => {
              if (typeof window !== "undefined") {
                const currentHash = window.location.hash;
                if (currentHash) {
                  window.setTimeout(() => {
                    window.location.hash = currentHash;
                  }, 50);
                }
              }
              if (!active) {
                track("language_change", { from: locale, to: option.locale });
              }
            }}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
