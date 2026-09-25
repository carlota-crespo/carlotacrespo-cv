"use client";

import { useTranslations } from "next-intl";
import { LINKEDIN_URL } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { ContactForm } from "./ContactForm";
import { ExternalLink } from "./ExternalLink";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact">
      <div className="rounded-[36px] bg-navy px-6 py-10 text-foreground sm:px-10 sm:py-14">
        <SectionHeading kicker="05" title={t("title")} />
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg">{t("intro")}</p>
            <p className="mt-6">
              <ExternalLink
                href={LINKEDIN_URL}
                className="font-semibold underline decoration-teal underline-offset-4"
                onClick={() => track("linkedin")}
              >
                {t("linkedin")}
              </ExternalLink>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
