import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="px-4 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display font-semibold tracking-wide text-foreground">
          {SITE_NAME} · {t("personal")}
        </p>
        <p>{t("independence")}</p>
      </div>
    </footer>
  );
}
