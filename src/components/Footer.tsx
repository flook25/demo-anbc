import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Clock, FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/config/company";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const locale = useLocale();

  const links = [
    { href: "#solutions", label: nav("solutions") },
    { href: "#why", label: nav("why") },
    { href: "#process", label: nav("process") },
    { href: "#contact", label: nav("contact") },
  ];

  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-block rounded-lg bg-white px-3 py-2">
            <Image
              src="/pictures/logo.png"
              alt="Thailand ANBC logo"
              width={990}
              height={170}
              className="h-7 w-auto"
            />
          </div>
          <p className="mt-5 text-lg font-bold text-white">{company.nameEn}</p>
          {locale === "th" && (
            <p className="mt-1 text-sm text-slate-400">{company.nameTh}</p>
          )}
          <p className="mt-4 max-w-md text-sm leading-relaxed">{t("about")}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              <span>
                <span className="sr-only">{t("addressLabel")}: </span>
                {t("address")}
              </span>
            </li>
            <li className="flex gap-3">
              <FileText className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              <span>
                {t("taxIdLabel")}: {company.taxId}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            {t("contactLabel")}
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-accent-400" aria-hidden />
              <a href={company.phoneHref} className="hover:text-white">
                {t("phoneLabel")}: {company.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-accent-400" aria-hidden />
              <a href={`mailto:${company.email}`} className="break-all hover:text-white">
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-accent-400" aria-hidden />
              <span>
                {t("lineLabel")}: {company.lineId}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-accent-400" aria-hidden />
              <span>
                {t("hoursLabel")}: {t("hours")}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            {t("linksLabel")}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          © <CopyrightYear /> {company.nameEn} {t("rights")}
        </p>
      </div>
    </footer>
  );
}
