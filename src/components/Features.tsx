import { useTranslations } from "next-intl";
import { ArrowRight, Bot, Cog, Cpu, Wrench } from "lucide-react";

const items = [
  { key: "robots", icon: Bot },
  { key: "parts", icon: Cog },
  { key: "plc", icon: Cpu },
  { key: "service", icon: Wrench },
] as const;

export default function Features() {
  const t = useTranslations("Features");

  return (
    <section id="solutions" className="bg-slate-50 py-20 sm:py-24">
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }, i) => (
            <article
              key={key}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
            >
              <span className="absolute right-6 top-6 font-mono text-sm font-bold text-slate-300">
                0{i + 1}
              </span>
              <div className="flex size-14 items-center justify-center rounded-xl bg-brand-700 text-white transition-colors group-hover:bg-accent-500 group-hover:text-brand-950">
                <Icon className="size-7" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-bold text-brand-900">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-600">
                {t(`items.${key}.description`)}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-accent-600"
              >
                {t("learnMore")}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
