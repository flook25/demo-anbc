import { useTranslations } from "next-intl";
import { Car, FlaskConical, UtensilsCrossed, Warehouse } from "lucide-react";

const industries = [
  { key: "automotive", icon: Car },
  { key: "food", icon: UtensilsCrossed },
  { key: "medical", icon: FlaskConical },
  { key: "logistics", icon: Warehouse },
] as const;

export default function Industries() {
  const t = useTranslations("Industries");

  return (
    <section id="industries" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-accent-400/15 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-brand-950">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-900">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
