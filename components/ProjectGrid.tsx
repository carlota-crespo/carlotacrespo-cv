import { getTranslations } from "next-intl/server";
import {
  CORE_PROJECT_IDS,
  MISSION_PROJECT_ID,
  PRIMARY_PROJECT_IDS,
} from "@/lib/constants";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ProjectGrid() {
  const t = await getTranslations("projects");
  const core = CORE_PROJECT_IDS.map((id) => loadProject(t, id));
  const mission = loadProject(t, MISSION_PROJECT_ID);
  const primary = new Set<string>(PRIMARY_PROJECT_IDS);

  return (
    <Section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading
        index={4}
        kicker={t("kicker")}
        title={t("title")}
        description={t("intro")}
      />
      <ul className="grid items-start gap-5 md:grid-cols-2">
        {core.map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              variant={primary.has(project.id) ? "primary" : "compact"}
            />
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-3xl border border-rose bg-sand px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-rose-deep uppercase">
          {t("mission.kicker")}
        </p>
        <h3 className="mt-2 max-w-3xl text-xl font-semibold text-ink sm:text-2xl">
          {t("mission.title")}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
          {t("mission.body")}
        </p>
        <div className="mt-6 md:max-w-[calc(50%-0.625rem)]">
          <ProjectCard project={mission} variant="mission" headingLevel="h4" />
        </div>
      </div>
    </Section>
  );
}

function loadProject(
  t: Awaited<ReturnType<typeof getTranslations>>,
  id: string,
): ProjectCardData {
  return {
    id,
    area: t(`items.${id}.area`),
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    contributions: t.raw(`items.${id}.contributions`) as string[],
    skills: t.raw(`items.${id}.skills`) as string[],
  };
}
