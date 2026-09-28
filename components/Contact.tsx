"use client";

import { useTranslations } from "next-intl";
import { EMAIL, LINKEDIN_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";
import { SectionKicker } from "./SectionKicker";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div>
          <SectionKicker index={6}>{t("title")}</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            <a
              href={`mailto:${EMAIL}`}
              className="underline decoration-rose-deep/40 underline-offset-4 transition hover:text-rose-deep"
              onClick={() => track("get_in_touch")}
            >
              {t("heading")}
            </a>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-soft min-[1536px]:text-lg">
            {t("intro")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-soft min-[1536px]:text-lg">
            {t("body")}
          </p>
          <p className="mt-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 text-ink-soft transition hover:text-ink"
              onClick={() => track("get_in_touch")}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-sand text-rose-deep">
                <MailIcon />
              </span>
              {EMAIL}
            </a>
          </p>
          <p className="mt-4">
            <ExternalLink
              href={LINKEDIN_URL}
              className="inline-flex items-center gap-3 text-ink-soft transition hover:text-ink"
              onClick={() => track("linkedin")}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-sand text-rose-deep">
                <LinkedInIcon />
              </span>
              {t("linkedin")}
            </ExternalLink>
          </p>
      </div>
    </Section>
  );
}

function MailIcon() {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
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
