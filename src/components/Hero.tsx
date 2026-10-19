import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Bot,
  Cpu,
  Factory,
  HardHat,
  PackageCheck,
  ScanEye,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");
  const f = useTranslations("Features.items");

  const trust = [
    { icon: PackageCheck, label: t("trust.import") },
    { icon: HardHat, label: t("trust.engineers") },
    { icon: ShieldCheck, label: t("trust.support") },
  ];

  const modules = [
    { icon: Bot, label: f("robots.title"), status: "RUN" },
    { icon: Factory, label: f("injection.title"), status: "OK" },
    { icon: Cpu, label: f("cnc.title"), status: "RUN" },
    { icon: ScanEye, label: f("inspection.title"), status: "OK" },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Background demo video from public/video/. Decorative, so it's hidden
          from screen readers and skipped for users who prefer reduced motion. */}
      <video
        aria-hidden
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/industrial-robot-arm-demo.mp4" type="video/mp4" />
      </video>
      {/* Dark gradient keeps the headline readable over the footage */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/50"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-950 to-transparent"
      />

      {/* Engineering grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#4a82c8_1px,transparent_1px),linear-gradient(to_bottom,#4a82c8_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-brand-600/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1 text-xs font-semibold text-accent-300 sm:text-sm">
            <span className="size-2 rounded-full bg-accent-400" aria-hidden />
            {t("badge")}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 text-base font-bold text-brand-950 shadow-lg shadow-accent-500/20 transition-colors hover:bg-accent-400"
            >
              {t("primaryCta")}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {t("secondaryCta")}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-100">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-5 text-accent-400" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Control-panel style visual summarising the four services */}
        <div className="hidden lg:block" aria-hidden>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs tracking-widest text-brand-200">
                ANBC · LINE CONTROL
              </span>
              <span className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                ONLINE
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {modules.map(({ icon: Icon, label, status }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-brand-900/80 p-5"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="size-9 text-accent-400" />
                    <span className="rounded bg-emerald-400/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                      {status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{label}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hazard stripe accent */}
      <div
        aria-hidden
        className="h-2 w-full [background:repeating-linear-gradient(-45deg,#f59e0b_0_14px,#06152d_14px_28px)]"
      />
    </section>
  );
}
