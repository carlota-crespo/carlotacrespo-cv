export type ProjectCardData = {
  id: string;
  area: string;
  filter: string;
  title: string;
  description: string;
  contributions: string[];
  skills: string[];
};

type Variant = "primary" | "compact" | "mission";

const cardClass: Record<Variant, string> = {
  primary:
    "rounded-3xl border border-sand bg-white/85 p-6 shadow-sm sm:p-7",
  compact: "rounded-3xl border border-sand bg-white/70 p-5 shadow-sm",
  mission: "rounded-3xl border border-rose bg-white p-6 shadow-sm sm:p-7",
};

export function ProjectCard({
  project,
  variant,
  headingLevel = "h3",
}: {
  project: ProjectCardData;
  variant: Variant;
  headingLevel?: "h3" | "h4";
}) {
  const Title = headingLevel;

  return (
    <article
      className={`${cardClass[variant]} transition duration-200 hover:border-rose hover:shadow-md motion-reduce:transition-none`}
    >
      <p className="w-fit max-w-full rounded-full bg-rose px-3 py-1 text-xs font-semibold leading-5 tracking-wide text-rose-deep">
        {project.area}
      </p>
      <Title
        className={`mt-4 font-semibold text-ink ${
          variant === "compact" ? "text-base" : "text-lg"
        }`}
      >
        {project.title}
      </Title>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink-soft">
        {project.contributions.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-rose-deep">
              –
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-sand px-2.5 py-1 text-[11px] leading-4 text-ink-soft"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
