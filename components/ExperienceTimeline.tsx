import { getTranslations } from "next-intl/server";
import { EXPERIENCE_ROLES } from "@/lib/constants";
import { isSpecializedRoleUpcoming } from "@/lib/experience";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ExperienceTimeline() {
  const t = await getTranslations("experience");
  const achievements = t.raw("achievements") as string[];
  const upcoming = isSpecializedRoleUpcoming();

  return (
    <Section id="experience">
      <SectionHeading kicker={`02 · ${t("company")}`} title={t("title")} />
      <ol className="relative space-y-5 border-l border-line pl-6 sm:pl-8">
        {[...EXPERIENCE_ROLES].reverse().map((role, index) => {
          const isUpcoming = role.id === "specialized" && upcoming;
          const title = isUpcoming
            ? `${t("upcomingPrefix")} — ${role.title}`
            : role.title;

          return (
            <li key={role.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-6 -left-[1.7rem] h-3 w-3 rounded-full sm:-left-[2.2rem] ${
                  isUpcoming ? "border-2 border-teal bg-background" : "bg-teal"
                }`}
              />
              <article className="rounded-[28px] border border-line bg-card p-5 shadow-[var(--shadow)] sm:p-7">
                <p className="font-display text-sm font-semibold text-teal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-medium text-cobalt">
                  {t(`roles.${role.id}.period`)}
                </p>
                <p className="mt-3 max-w-3xl">{t(`roles.${role.id}.description`)}</p>
              </article>
            </li>
          );
        })}
      </ol>
      <div className="mt-10 rounded-[32px] bg-navy p-6 text-foreground sm:p-8">
        <h3 className="font-display text-2xl font-semibold">
          {t("achievementsTitle")}
        </h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {achievements.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
