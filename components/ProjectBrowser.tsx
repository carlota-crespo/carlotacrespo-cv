"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Props = {
  core: ProjectCardData[];
  mission: ProjectCardData;
  primaryIds: string[];
  allLabel: string;
  filterLabel: string;
  missionKicker: string;
  missionTitle: string;
  missionBody: string;
};

export function ProjectBrowser({
  core,
  mission,
  primaryIds,
  allLabel,
  filterLabel,
  missionKicker,
  missionTitle,
  missionBody,
}: Props) {
  const primary = useMemo(() => new Set(primaryIds), [primaryIds]);
  const areas = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const project of [...core, mission]) {
      if (seen.has(project.filter)) continue;
      seen.add(project.filter);
      list.push(project.filter);
    }
    return list;
  }, [core, mission]);
  const [active, setActive] = useState("all");
  const visibleCore =
    active === "all" ? core : core.filter((project) => project.filter === active);
  const showMission = active === "all" || mission.filter === active;

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={filterLabel}
      >
        <FilterButton
          id="project-filter-all"
          selected={active === "all"}
          onSelect={() => setActive("all")}
        >
          {allLabel}
        </FilterButton>
        {areas.map((area, index) => (
          <FilterButton
            key={area}
            id={`project-filter-${index}`}
            selected={active === area}
            onSelect={() => setActive(area)}
          >
            {area}
          </FilterButton>
        ))}
      </div>
      <div
        role="tabpanel"
        id="project-panel"
        aria-labelledby={
          active === "all"
            ? "project-filter-all"
            : `project-filter-${areas.indexOf(active)}`
        }
      >
        {visibleCore.length > 0 ? (
          <ul className="grid items-start gap-5 md:grid-cols-2">
            {visibleCore.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  project={project}
                  variant={primary.has(project.id) ? "primary" : "compact"}
                />
              </li>
            ))}
          </ul>
        ) : null}
        {showMission ? (
          <div
            className={`${visibleCore.length > 0 ? "mt-12" : ""} rounded-3xl border border-rose bg-sand px-5 py-8 sm:px-8 sm:py-10`}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-rose-deep uppercase">
              {missionKicker}
            </p>
            <h3 className="mt-2 max-w-3xl text-xl font-semibold text-ink sm:text-2xl">
              {missionTitle}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
              {missionBody}
            </p>
            <div className="mt-6 md:max-w-[calc(50%-0.625rem)]">
              <ProjectCard
                project={mission}
                variant="mission"
                headingLevel="h4"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FilterButton({
  id,
  selected,
  onSelect,
  children,
}: {
  id: string;
  selected: boolean;
  onSelect: () => void;
  children: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls="project-panel"
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        selected
          ? "bg-rose-deep text-white shadow-sm"
          : "bg-sand text-ink-soft hover:bg-rose"
      }`}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}
