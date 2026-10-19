import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  Factory,
  Cpu,
  ScanEye,
  Cog,
} from "lucide-react";
import ProductImage from "./ProductImage";

// Images live in public/pictures/ and are referenced from the site root.
// Each entry pairs a file with its caption key under Features.gallery.
// `ns` is the message namespace for the card's title/description/tags.
// The first two are "featured": they take half the row each on desktop so
// their multi-image galleries get room; the other three share the next row.
const items = [
  {
    ns: "items.robots",
    icon: Bot,
    featured: true,
    images: [
      ["/pictures/6axis-handling-robot.png", "handling"],
      ["/pictures/6axis-welding-robot.png", "welding"],
      ["/pictures/6axis-carving-robot.png", "carving"],
    ],
  },
  {
    ns: "items.injection",
    icon: Factory,
    featured: true,
    images: [
      ["/pictures/heavy-duty-bull-head-robot.png", "bullHead"],
      ["/pictures/oblique-and-side-servo-robots.png", "servo"],
    ],
  },
  {
    ns: "items.cnc",
    icon: Cpu,
    featured: false,
    images: [["/pictures/cnc-auto.png", "cnc"]],
  },
  {
    ns: "items.inspection",
    icon: ScanEye,
    featured: false,
    images: [["/pictures/special-equipment-station.png", "special"]],
  },
  {
    ns: "parts",
    icon: Cog,
    featured: false,
    images: [["/pictures/automation-parts-overview.png", "parts"]],
  },
] as const;

export default function Features() {
  const t = useTranslations("Features");
  const gallery = (images: readonly (readonly [string, string])[]) =>
    images.map(([src, caption]) => ({
      src,
      caption: t(`gallery.${caption}`),
    }));

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

        {/* 6-column track: featured cards span 3, the rest span 2 */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {items.map(({ ns, icon: Icon, featured, images }, i) => (
            <article
              key={ns}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl ${
                featured ? "lg:col-span-3" : "lg:col-span-2"
              } ${i === items.length - 1 ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Accent bar that lights up on hover */}
              <div
                aria-hidden
                className="h-1 w-full bg-gradient-to-r from-brand-600 via-brand-400 to-accent-500 opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-6"}`}>
                <ProductImage
                  images={gallery(images)}
                  alt={t(`${ns}.title`)}
                  fallback={<Icon className="size-16" aria-hidden />}
                  sizes={
                    featured
                      ? "(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  }
                  className={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
                />

                <div className="mt-6 flex items-center gap-4">
                  <div
                    className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition-colors group-hover:bg-accent-500 group-hover:text-brand-950 ${
                      featured ? "size-14" : "size-12"
                    }`}
                  >
                    <Icon className={featured ? "size-7" : "size-6"} aria-hidden />
                  </div>
                  <h3
                    className={`min-w-0 flex-1 font-bold leading-snug text-brand-900 ${
                      featured ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {t(`${ns}.title`)}
                  </h3>
                  <span className="self-start font-mono text-sm font-bold text-slate-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {t(`${ns}.description`)}
                </p>
                <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                  {(t.raw(`${ns}.tags`) as string[]).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 hover:text-accent-600"
                >
                  {t("learnMore")}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
