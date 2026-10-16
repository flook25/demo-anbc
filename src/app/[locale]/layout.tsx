import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

// Chinese fonts are large; skip preloading so the browser only fetches
// the glyph ranges it actually needs (mostly on /zh).
const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/icon.svg" },
    alternates: {
      canonical: `/${locale}`,
      languages: { th: "/th", zh: "/zh" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "th"}
      className={`${notoThai.variable} ${notoSC.variable} antialiased`}
    >
      <body 
        className="min-h-screen bg-white font-sans text-slate-800"
        suppressHydrationWarning
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
