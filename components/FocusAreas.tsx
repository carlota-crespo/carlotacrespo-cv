import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionKicker } from "./SectionKicker";

export async function FocusAreas() {
  const t = await getTranslations("focus");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <Section id="focus" className="scroll-mt-24 py-4 sm:py-6">
      <SectionKicker index={2}>{t("kicker")}</SectionKicker>
      <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{t("title")}</h2>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="rounded-3xl bg-sand p-6">
            <h3 className="text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
