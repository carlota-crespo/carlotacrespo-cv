import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  children,
  className = "py-20 sm:py-24",
}: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 sm:px-6 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
