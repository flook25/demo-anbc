import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { company } from "@/config/company";

export default function ContactCTA() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="bg-accent-500">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold text-brand-950 text-balance sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-brand-900 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={company.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-900 px-6 py-4 font-bold text-white transition-colors hover:bg-brand-800"
          >
            <Phone className="size-5" aria-hidden />
            {t("call")} · {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-900 px-6 py-4 font-bold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
          >
            <Mail className="size-5" aria-hidden />
            {t("email")}
          </a>
        </div>
      </div>
    </section>
  );
}
