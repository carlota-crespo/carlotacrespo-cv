"use client";

import { useMemo, useState } from "react";
import type { ProjectId } from "@/lib/constants";

export type ProjectCardData = {
  id: ProjectId;
  area: string;
  title: string;
  description: string;
  contributions: string[];
  skills: string[];
};

type Props = {
  allLabel: string;
  filterLabel: string;
  contributionLabel: string;
  skillsLabel: string;
  projects: ProjectCardData[];
};

export function ProjectTabs({
  allLabel,
  filterLabel,
  contributionLabel,
  skillsLabel,
  projects,
}: Props) {
  const areas = useMemo(
    () => [...new Set(projects.map((project) => project.area))],
    [projects],
  );
  const [active, setActive] = useState<string>("all");
  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.area === active);

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={filterLabel}
      >
        <TabButton
          id="project-tab-all"
          selected={active === "all"}
          onSelect={() => setActive("all")}
        >
          {allLabel}
        </TabButton>
        {areas.map((area, index) => {
          const tabId = `project-tab-${index}`;
          return (
            <TabButton
              key={area}
              id={tabId}
              selected={active === area}
              onSelect={() => setActive(area)}
            >
              {area}
            </TabButton>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="project-panel"
        aria-labelledby={
          active === "all"
            ? "project-tab-all"
            : `project-tab-${areas.indexOf(active)}`
        }
      >
        <ul className="grid gap-5 md:grid-cols-2">
          {visible.map((project) => (
            <li
              key={project.id}
              className="flex flex-col rounded-3xl border border-sand bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-rose hover:shadow-md"
            >
              <span className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink">
                {project.area}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {project.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">{contributionLabel}</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-soft">
                {project.contributions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-rose-deep">
                      –
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-ink">{skillsLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-sand px-2.5 py-1 text-xs text-ink-soft"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TabButton({
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
