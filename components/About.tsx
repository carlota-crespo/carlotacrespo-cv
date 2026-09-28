import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function About() {
  const t = await getTranslations("about");
  const education = t.raw("education") as { title: string; org: string }[];

  return (
    <Section id="about">
      <SectionHeading kicker="01" title={t("title")} />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-lg text-foreground/85">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
        <div className="rounded-[28px] bg-lilac p-6">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-cobalt uppercase">
            {t("educationTitle")}
          </h3>
          <ul className="mt-5 space-y-5">
            {education.map((item) => (
              <li key={`${item.title}-${item.org}`}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-muted">{item.org}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
