import type { ReactNode } from "react";

type Props = {
  index: number;
  children?: ReactNode;
};

export function SectionKicker({ index, children }: Props) {
  const number = String(index).padStart(2, "0");

  return (
    <p className="text-xs font-semibold tracking-[0.18em] text-rose-deep uppercase">
      {number}
      {children ? <span className="px-2">·</span> : null}
      {children}
    </p>
  );
}
