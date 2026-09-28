import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

const GROUP_IDS = [
  "product",
  "expertise",
  "tools",
  "strengths",
  "languages",
] as const;

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <Section id="skills">
      <SectionHeading kicker="04" title={t("title")} />
      <div className="grid gap-5 md:grid-cols-2">
        {GROUP_IDS.map((id) => {
          const items = (t.raw(`groups.${id}.items`) as string[]) ?? [];
          return (
            <article
              key={id}
              className="rounded-[24px] bg-lilac p-6"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {t(`groups.${id}.title`)}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <li
                    key={`${id}-${index}`}
                    className="rounded-full bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
