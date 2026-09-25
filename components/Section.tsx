import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
