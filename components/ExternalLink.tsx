"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ExternalLink({ href, children, className, onClick }: Props) {
  const t = useTranslations("a11y");

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
      <span className="sr-only"> ({t("externalLink")})</span>
    </a>
  );
}
