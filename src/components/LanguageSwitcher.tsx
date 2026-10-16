"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = { th: "TH", zh: "中文" };

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("Nav");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`inline-flex rounded-full border border-slate-300 bg-slate-100 p-0.5 text-sm font-semibold ${className}`}
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1 transition-colors ${
              active
                ? "bg-brand-700 text-white shadow-sm"
                : "text-slate-600 hover:text-brand-700"
            }`}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
