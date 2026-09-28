"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "./ExternalLink";
import { LINKEDIN_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Hero() {
  const t = useTranslations("hero");
  const highlights = t.raw("highlights") as { value: string; label: string }[];

  return (
    <section
      id="home"
      className="relative scroll-mt-20 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 min-[1536px]:max-w-7xl min-[1920px]:max-w-[90rem] lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="flex items-center gap-4 sm:gap-5">
            <Image
              src="/carlota-portrait.jpg"
              alt=""
              width={176}
              height={176}
              priority
              className="size-32 shrink-0 rounded-3xl object-cover shadow-sm ring-1 ring-sand sm:size-40"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight text-ink">{t("name")}</p>
              <p className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink">
                <span className="size-1.5 shrink-0 rounded-full bg-rose-deep" aria-hidden="true" />
                {t("headline")}
              </p>
            </div>
          </div>
          <h1 className="mt-5 max-w-3xl text-[1.65rem] leading-tight font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t("subheadline")}
          </h1>
          <p className="mt-3 text-sm font-semibold tracking-wide text-rose-deep sm:text-base">
            {t("specialties")}
          </p>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>{t("intro")}</p>
            <p>{t("value")}</p>
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPinIcon />
            {t("location")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal"
              onClick={() => track("view_experience")}
            >
              {t("ctaExperience")}
              <ArrowIcon />
            </a>
            <ExternalLink
              href={LINKEDIN_URL}
              className="inline-flex items-center rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-sm font-semibold text-ink transition hover:border-rose-deep hover:bg-sand"
              onClick={() => track("linkedin")}
            >
              {t("ctaLinkedin")}
            </ExternalLink>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
              onClick={() => track("get_in_touch")}
            >
              {t("ctaContact")}
            </a>
          </div>
        </div>
        <aside className="rounded-3xl border border-sand bg-white/70 p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.18em] text-rose-deep uppercase">
            {t("hookLabel")}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((item) => (
              <li key={item.value} className="rounded-2xl bg-sand/80 px-4 py-3">
                <p className="text-lg font-semibold text-ink">{item.value}</p>
                <p className="text-sm text-ink-soft">{item.label}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-rose-deep"
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
