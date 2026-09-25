"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "./ExternalLink";
import { LINKEDIN_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";

export function Hero() {
  const t = useTranslations("hero");
  const highlights = t.raw("highlights") as string[];

  return (
    <section id="home" className="scroll-mt-28 px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-line bg-card px-4 py-1.5 font-display text-sm font-semibold tracking-[0.16em] text-teal uppercase">
            {t("headline")}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
          <p className="mt-5 max-w-xl text-xl font-medium text-cobalt sm:text-2xl">
            {t("subheadline")}
          </p>
          <p className="mt-6 max-w-2xl text-lg text-foreground">{t("intro")}</p>
          <p className="mt-4 max-w-2xl font-medium text-foreground">{t("value")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#experience"
              className="inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-2.5 font-semibold text-foreground hover:brightness-95"
              onClick={() => track("view_experience")}
            >
              {t("ctaExperience")}
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full border border-navy bg-card px-6 py-2.5 font-semibold text-foreground hover:bg-white"
              onClick={() => track("get_in_touch")}
            >
              {t("ctaContact")}
            </a>
            <ExternalLink
              href={LINKEDIN_URL}
              className="inline-flex min-h-12 items-center rounded-full px-5 py-2.5 font-semibold text-cobalt underline decoration-teal underline-offset-4 hover:text-foreground"
              onClick={() => track("linkedin")}
            >
              {t("ctaLinkedin")}
            </ExternalLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-line bg-card shadow-[var(--shadow)]">
          <Image
            src="/carlota.jpg"
            alt={t("name")}
            width={1024}
            height={1024}
            preload
            sizes="(max-width: 1024px) 100vw, 28rem"
            className="h-auto w-full"
          />
        </div>
      </div>
      <ol className="mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {highlights.map((item, index) => (
          <li
            key={item}
            className="rounded-[24px] border border-line bg-card/80 p-4 shadow-[var(--shadow)]"
          >
            <p className="font-display text-sm font-semibold text-teal">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm leading-snug text-foreground">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
