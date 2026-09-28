import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
};

export function SectionHeading({
  kicker,
  title,
  description,
  children,
  tone = "light",
}: Props) {
  const titleColor = tone === "dark" ? "text-white" : "text-foreground";
  const kickerColor = tone === "dark" ? "text-teal" : "text-teal";
  const descriptionColor = tone === "dark" ? "text-white/80" : "text-muted";

  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {kicker ? (
          <p
            className={`mb-2 text-sm font-semibold tracking-[0.16em] uppercase ${kickerColor}`}
          >
            {kicker}
          </p>
        ) : null}
        <h2
          className={`text-3xl font-semibold tracking-tight sm:text-4xl ${titleColor}`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-4 max-w-2xl text-lg ${descriptionColor}`}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
