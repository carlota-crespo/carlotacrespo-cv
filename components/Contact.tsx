"use client";

import { useTranslations } from "next-intl";
import { LINKEDIN_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { ContactForm } from "./ContactForm";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";
import { SectionKicker } from "./SectionKicker";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionKicker index={6}>{t("title")}</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{t("heading")}</h2>
          <p className="mt-4 text-ink-soft">{t("intro")}</p>
          <p className="mt-4 text-ink-soft">{t("body")}</p>
          <p className="mt-8">
            <ExternalLink
              href={LINKEDIN_URL}
              className="inline-flex items-center gap-3 text-ink-soft transition hover:text-ink"
              onClick={() => track("linkedin")}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-sand text-ink">
                <LinkedInIcon />
              </span>
              {t("linkedin")}
            </ExternalLink>
          </p>
        </div>
        <div className="rounded-3xl border border-sand bg-white/80 p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
