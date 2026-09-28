"use client";

import { useMemo, useState } from "react";
import type { ProjectId } from "@/lib/constants";

export type ProjectCardData = {
  id: ProjectId;
  area: string;
  title: string;
  description: string;
  contributions: string[];
};

type Props = {
  allLabel: string;
  filterLabel: string;
  contributionLabel: string;
  projects: ProjectCardData[];
};

export function ProjectTabs({
  allLabel,
  filterLabel,
  contributionLabel,
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
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => {
            const featured = active === "all" && index === 0;
            return (
              <li
                key={project.id}
                className={`card-surface flex flex-col rounded-[32px] p-6 sm:p-8 ${
                  featured
                    ? "md:col-span-2 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-10"
                    : ""
                }`}
              >
                <div>
                  <p className="font-display text-sm font-semibold tracking-[0.16em] text-teal uppercase">
                    {String(index + 1).padStart(2, "0")} · {project.area}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-lg">{project.description}</p>
                </div>
                <div className={featured ? "mt-6 md:mt-0" : "mt-6"}>
                  <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
                    {contributionLabel}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.contributions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-teal">
                          –
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
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
      className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold ${
        selected
          ? "bg-teal text-white"
          : "border border-line bg-card text-foreground hover:bg-white"
      }`}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}
