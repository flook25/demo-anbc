import { useTranslations } from "next-intl";
import { Award, ShieldCheck, Ship, Truck, UserCog } from "lucide-react";

const reasons = [
  { key: "experience", icon: Award },
  { key: "import", icon: Ship },
  { key: "delivery", icon: Truck },
  { key: "consulting", icon: UserCog },
] as const;

const certifications = ["ISO9001", "PSE", "ETL", "CE", "CQC"] as const;

const steps = ["consult", "design", "install", "support"] as const;

export default function WhyChooseUs() {
  const t = useTranslations("Why");

  return (
    <section id="why" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>

          <ul className="mt-10 space-y-8">
            {reasons.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent-400/15 text-accent-600">
                  <Icon className="size-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-900">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-1 leading-relaxed text-slate-600">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-900">
              <ShieldCheck className="size-5 text-accent-600" aria-hidden />
              {t("certs.title")}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded-md border border-brand-200 bg-white px-3 py-1.5 font-mono text-sm font-bold text-brand-700"
                >
                  {cert}
                </li>
              ))}
              <li className="rounded-md border border-accent-400/40 bg-accent-400/15 px-3 py-1.5 text-sm font-bold text-accent-600">
                {t("certs.patents")}
              </li>
            </ul>
          </div>
        </div>

        <div
          id="process"
          className="scroll-mt-24 self-start rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-white shadow-xl sm:p-10"
        >
          <h3 className="text-2xl font-bold">{t("process.title")}</h3>
          <ol className="relative mt-8 space-y-8 border-l-2 border-dashed border-brand-500 pl-8">
            {steps.map((step, i) => (
              <li key={step} className="relative">
                <span className="absolute -left-[3.05rem] flex size-9 items-center justify-center rounded-full bg-accent-500 font-mono text-sm font-bold text-brand-950 ring-4 ring-brand-900">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-lg font-semibold">
                  {t(`process.steps.${step}`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
