import { getTranslations } from "next-intl/server";
import { PROJECT_IDS } from "@/lib/constants";
import { ProjectTabs } from "./ProjectTabs";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export async function ProjectGrid() {
  const t = await getTranslations("projects");
  const projects = PROJECT_IDS.map((id) => ({
    id,
    area: t(`items.${id}.area`),
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    contributions: t.raw(`items.${id}.contributions`) as string[],
    skills: t.raw(`items.${id}.skills`) as string[],
  }));

  return (
    <Section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <SectionHeading index={4} title={t("title")} description={t("intro")} />
      <ProjectTabs
        allLabel={t("filters.all")}
        filterLabel={t("filters.label")}
        contributionLabel={t("contributionLabel")}
        skillsLabel={t("skillsLabel")}
        projects={projects}
      />
    </Section>
  );
}
