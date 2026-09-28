import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-foreground">{t("title")}</h1>
      <p className="text-muted">{t("body")}</p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 font-semibold text-white"
      >
        {t("home")}
      </Link>
    </div>
  );
}
