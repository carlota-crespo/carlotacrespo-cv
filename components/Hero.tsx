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
    <section id="home" className="scroll-mt-28 px-4 pb-8 pt-6 sm:px-6 lg:pt-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-foreground">{t("name")}</p>
          <p className="mt-4 inline-flex rounded-full bg-lilac px-3 py-1 text-sm font-medium text-cobalt">
            {t("headline")}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.12] font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("subheadline")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-foreground/80">{t("intro")}</p>
          <p className="mt-4 max-w-2xl text-foreground/80">{t("value")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#experience"
              className="inline-flex min-h-12 items-center rounded-full bg-teal px-5 py-2.5 font-semibold text-white hover:bg-teal/90"
              onClick={() => track("view_experience")}
            >
              {t("ctaExperience")}
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-5 py-2.5 font-semibold text-foreground hover:bg-lilac"
              onClick={() => track("get_in_touch")}
            >
              {t("ctaContact")}
            </a>
            <ExternalLink
              href={LINKEDIN_URL}
              className="inline-flex min-h-12 items-center px-3 py-2.5 font-semibold text-foreground hover:text-teal"
              onClick={() => track("linkedin")}
            >
              {t("ctaLinkedin")}
            </ExternalLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[28px] bg-lilac">
          <Image
            src="/carlota.jpg"
            alt={t("name")}
            width={1024}
            height={1024}
            preload
            sizes="(max-width: 1024px) 100vw, 24rem"
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl rounded-[28px] border border-line bg-card p-4 sm:p-6">
        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-teal uppercase">
          {t("hookLabel")}
        </p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item) => (
            <li key={item} className="rounded-2xl bg-lilac px-4 py-4">
              <p className="text-sm leading-snug font-medium text-foreground">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
