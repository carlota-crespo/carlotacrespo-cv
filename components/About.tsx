import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { SectionKicker } from "./SectionKicker";

export async function About() {
  const t = await getTranslations("about");
  const education = t.raw("education") as { title: string; org: string }[];
  const languages = t.raw("languages") as { name: string; level: string }[];

  return (
    <Section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <SectionKicker index={1}>{t("title")}</SectionKicker>
      <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
        {t.rich("bridge", {
          mark: (chunks) => (
            <mark className="rounded-md bg-rose px-1.5 text-ink">{chunks}</mark>
          ),
        })}
      </h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-ink-soft min-[1536px]:text-lg">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
      </div>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-sand bg-white/70 p-6">
          <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
            {t("languagesTitle")}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li
                key={language.name}
                className="w-fit max-sm:hover:w-full max-sm:focus-within:w-full"
              >
                <span
                  tabIndex={0}
                  aria-label={`${language.name}, ${language.level}`}
                  className="group inline-flex cursor-default rounded-full bg-sand px-4 py-2 text-sm font-medium text-ink outline-none transition-colors hover:bg-rose focus-visible:bg-rose"
                >
                  <span
                    aria-hidden="true"
                    className="group-hover:hidden group-focus-visible:hidden"
                  >
                    {language.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden whitespace-nowrap group-hover:inline group-focus-visible:inline"
                  >
                    {language.level}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-sand bg-white/70 p-6">
          <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
            {t("educationTitle")}
          </h3>
          <ul className="mt-4 space-y-4">
            {education.map((item) => (
              <li key={`${item.title}-${item.org}`}>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.org}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
