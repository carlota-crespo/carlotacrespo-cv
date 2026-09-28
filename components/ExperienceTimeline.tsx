import { getTranslations } from "next-intl/server";
import { EXPERIENCE_ROLES } from "@/lib/constants";
import { isSpecializedRoleUpcoming } from "@/lib/experience";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ExperienceTimeline() {
  const t = await getTranslations("experience");
  const achievements = t.raw("achievements") as { lead: string; text: string }[];
  const upcoming = isSpecializedRoleUpcoming();

  return (
    <Section id="experience" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading index={3} kicker={t("title")} title={t("heading")} />
      <ol className="relative space-y-8 border-l border-rose/80 pl-6 sm:pl-8">
        {[...EXPERIENCE_ROLES].reverse().map((role) => {
          const isUpcoming = role.id === "specialized" && upcoming;
          const title = isUpcoming
            ? `${t("upcomingPrefix")} — ${role.title}`
            : role.title;

          return (
            <li key={role.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[1.9rem] size-3.5 rounded-full border-2 border-background sm:-left-[2.4rem] ${
                  isUpcoming ? "bg-rose" : "bg-rose-deep"
                }`}
              />
              <article className="rounded-3xl border border-sand bg-white/70 p-6 shadow-sm transition hover:border-rose">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="text-sm text-ink-soft">{t(`roles.${role.id}.period`)}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-rose-deep">{t("company")}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
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
