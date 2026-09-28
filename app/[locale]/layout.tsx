import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getSiteUrl, LINKEDIN_URL, SITE_NAME } from "@/lib/constants";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}`;
  const languages = {
    es: `${siteUrl}/es`,
    en: `${siteUrl}/en`,
    "x-default": `${siteUrl}/es`,
  };

  return {
    metadataBase: new URL(siteUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "profile",
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_ES"],
      url,
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: messages.meta.title,
      description: messages.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteUrl = getSiteUrl();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Business Analyst",
    description:
      locale === "es"
        ? "Business Analyst con experiencia de Product Ownership en Compliance Technology y Corporate Governance, y trabajo en datos, transformación digital y automatización."
        : "Business Analyst with Product Ownership experience in Compliance Technology and Corporate Governance, and work across data, digital transformation and automation.",
    knowsAbout: [
      "Business Analysis",
      "Product Ownership",
      "Compliance Technology",
      "Corporate Governance",
      "Data Analytics",
      "Power BI",
      "Digital Transformation",
      "Process Automation",
      "AI Governance",
    ],
    url: `${siteUrl}/${locale}`,
    sameAs: [LINKEDIN_URL],
  };

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-background font-sans text-ink-soft">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
