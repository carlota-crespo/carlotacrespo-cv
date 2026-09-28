import { getTranslations } from "next-intl/server";
import { EXPERIENCE_ROLES } from "@/lib/constants";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ExperienceTimeline() {
  const t = await getTranslations("experience");
  const achievements = t.raw("achievements") as { lead: string; text: string }[];

  return (
    <Section id="experience" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading index={3} kicker={t("title")} title={t("heading")} />
      <ol className="relative space-y-5 border-l border-rose/80 pl-6 sm:pl-8">
        {[...EXPERIENCE_ROLES].reverse().map((role) => {
          const isCurrent = role.id === "specialized";

          return (
            <li key={role.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-[1.65rem] size-3.5 -left-[1.9rem] rounded-full border-2 border-background sm:-left-[2.4rem] ${
                  isCurrent ? "bg-rose-deep ring-4 ring-rose" : "bg-rose-deep"
                }`}
              />
              <article
                className={`rounded-3xl p-5 shadow-sm transition motion-reduce:transition-none ${
                  isCurrent
                    ? "border border-rose-deep bg-white"
                    : "border border-sand bg-white/70 hover:border-rose"
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
                    {isCurrent ? (
                      <p className="mt-2 w-fit max-w-full rounded-full bg-rose-deep px-2.5 py-1 text-[11px] leading-4 font-semibold tracking-wide text-white uppercase">
                        {t("badges.current")}
                      </p>
                    ) : null}
                    <p className="mt-1.5 text-sm font-medium text-rose-deep">{t("company")}</p>
                  </div>
                  <p className="text-xs text-ink-soft sm:shrink-0 sm:pt-1 sm:text-right">
                    {t(`roles.${role.id}.period`)}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {t(`roles.${role.id}.description`)}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
      <div className="mt-8 rounded-3xl bg-sand p-6 text-ink-soft sm:p-8">
        <h3 className="text-lg font-semibold text-ink">{t("achievementsTitle")}</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {achievements.map((item) => (
            <li key={item.lead} className="flex gap-3 text-sm leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-deep"
              />
              <span>
                <span className="font-semibold text-ink">{item.lead}</span>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
