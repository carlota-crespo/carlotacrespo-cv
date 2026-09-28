import { getTranslations } from "next-intl/server";
import {
  CORE_PROJECT_IDS,
  MISSION_PROJECT_ID,
  PRIMARY_PROJECT_IDS,
} from "@/lib/constants";
import { ProjectBrowser } from "./ProjectBrowser";
import type { ProjectCardData } from "./ProjectCard";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ProjectGrid() {
  const t = await getTranslations("projects");
  const core = CORE_PROJECT_IDS.map((id) => loadProject(t, id));
  const mission = loadProject(t, MISSION_PROJECT_ID);

  return (
    <Section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading
        index={4}
        kicker={t("kicker")}
        title={t("title")}
        description={t("intro")}
      />
      <ProjectBrowser
        core={core}
        mission={mission}
        primaryIds={[...PRIMARY_PROJECT_IDS]}
        allLabel={t("filters.all")}
        filterLabel={t("filters.label")}
        missionKicker={t("mission.kicker")}
        missionTitle={t("mission.title")}
        missionBody={t("mission.body")}
      />
    </Section>
  );
}

function loadProject(
  t: Awaited<ReturnType<typeof getTranslations>>,
  id: string,
): ProjectCardData {
  const area = t(`items.${id}.area`);
  return {
    id,
    area,
    filter: area.split(" · ")[0],
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    contributions: t.raw(`items.${id}.contributions`) as string[],
    skills: t.raw(`items.${id}.skills`) as string[],
  };
}
