export const SITE_NAME = "Carlota Crespo Suárez";
export const LINKEDIN_URL = "https://www.linkedin.com/in/carlotacresposuarez/";
export const EMAIL = "carlota-crespo@hotmail.com";
export const CONTACT_SOURCE = "personal-cv-web";
export const SPECIALIZED_ROLE_START = "2026-10-01";

export const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const EXPERIENCE_ROLES = [
  { id: "intern" as const, title: "IT Product Owner Intern" },
  { id: "entry" as const, title: "Analyst Jr Entry" },
  { id: "junior" as const, title: "Analyst Jr" },
  { id: "mission" as const, title: "Business Analyst · On Mission" },
  {
    id: "specialized" as const,
    title: "Business Analyst — Compliance & Corporate Governance",
  },
];

export const CORE_PROJECT_IDS = [
  "governance",
  "analytics",
  "whistleblowing",
  "complianceHub",
  "socialAudit",
  "repositories",
] as const;

export const PRIMARY_PROJECT_IDS = [
  "governance",
  "analytics",
  "whistleblowing",
  "complianceHub",
] as const;

export const MISSION_PROJECT_ID = "conflicts" as const;

export const PROJECT_IDS = [...CORE_PROJECT_IDS, MISSION_PROJECT_ID] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
