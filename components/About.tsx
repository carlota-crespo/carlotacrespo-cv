import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function About() {
  const t = await getTranslations("about");
  const education = t.raw("education") as { title: string; org: string }[];

  return (
    <Section id="about">
      <div className="overflow-hidden rounded-[32px] border border-line bg-card p-6 shadow-[var(--shadow)] sm:p-10 lg:p-14">
        <SectionHeading kicker="01" title={t("title")} />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
          <div className="rounded-[28px] bg-background p-6">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {t("educationTitle")}
            </h3>
            <ul className="mt-5 space-y-5">
              {education.map((item) => (
                <li
                  key={`${item.title}-${item.org}`}
                  className="border-l-2 border-teal pl-4"
                >
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted">{item.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
