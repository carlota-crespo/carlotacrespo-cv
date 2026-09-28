import type { ReactNode } from "react";
import { SectionKicker } from "./SectionKicker";

type Props = {
  index?: number;
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
};

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  children,
  tone = "light",
}: Props) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const kickerColor = "text-rose-deep";
  const descriptionColor = tone === "dark" ? "text-white/80" : "text-ink-soft";

  return (
    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {index ? (
          <SectionKicker index={index}>{kicker}</SectionKicker>
        ) : kicker ? (
          <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${kickerColor}`}>
            {kicker}
          </p>
        ) : null}
        <h2 className={`${index || kicker ? "mt-2" : ""} text-2xl font-semibold sm:text-3xl ${titleColor}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-4 max-w-2xl text-base leading-relaxed ${descriptionColor}`}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
