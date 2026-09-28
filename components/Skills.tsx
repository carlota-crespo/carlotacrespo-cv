import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

const GROUP_IDS = ["business", "compliance", "data", "ai"] as const;

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <Section id="skills" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading index={5} title={t("title")} />
      <div className="grid gap-5 md:grid-cols-2">
        {GROUP_IDS.map((id) => {
          const items = (t.raw(`groups.${id}.items`) as string[]) ?? [];
          return (
            <article key={id} className="rounded-3xl bg-sand p-6">
              <h3 className="text-base font-semibold text-ink">
                {t(`groups.${id}.title`)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((item, index) => (
                  <li
                    key={`${id}-${index}`}
                    className="flex items-start gap-2 text-sm text-ink-soft"
                  >
                    <SkillIcon />
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

function SkillIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0 text-rose-deep"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

