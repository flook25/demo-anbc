import { useTranslations } from "next-intl";
import { Activity, Gauge, Radio, ShieldCheck } from "lucide-react";

// Real footage from public/video/, framed as an industrial control monitor.
// The raw clip has a "REC" camera watermark in its top-left corner (roughly
// the first 20% × 22% of the frame); the camera badge panel, with some margin, sits over it.
export default function VideoShowcase() {
  const t = useTranslations("Showcase");

  const readouts = [
    { icon: Activity, label: t("readouts.mode"), value: "AUTO" },
    { icon: Gauge, label: t("readouts.axes"), value: "5-AXIS SERVO" },
    { icon: ShieldCheck, label: t("readouts.status"), value: "NORMAL" },
  ];

  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24"
    >
      {/* Engineering grid, matching the hero */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#4a82c8_1px,transparent_1px),linear-gradient(to_bottom,#4a82c8_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-400">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-brand-100">{t("subtitle")}</p>
        </div>

        {/* Monitor bezel */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-brand-900 to-brand-950 p-2 shadow-2xl shadow-black/50 ring-1 ring-black/40 sm:p-3">
          {/* Title bar */}
          <div className="flex items-center justify-between gap-3 px-2 pb-2 pt-1 sm:px-3 sm:pb-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex shrink-0 items-center gap-1.5 rounded bg-red-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-red-400">
                <span className="size-1.5 animate-pulse rounded-full bg-red-500" aria-hidden />
                LIVE DEMO
              </span>
              <span className="truncate font-mono text-[11px] tracking-widest text-brand-200 sm:text-xs">
                SERVO MANIPULATOR SERIES
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="size-2.5 rounded-full bg-accent-400/80" />
              <span className="size-2.5 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Screen: aspect matches the clip so the watermark mask stays aligned */}
          <div className="relative aspect-[1200/608] overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
            <video
              className="absolute inset-0 size-full object-cover"
              aria-label={t("videoLabel")}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            >
              <source src="/video/industrial-robot-arm-demo.mp4" type="video/mp4" />
            </video>

            {/* Scanline + vignette for the monitor look */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(to_bottom,transparent_0_2px,rgba(0,0,0,0.5)_2px_3px)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]"
            />

            {/* Camera badge, covering the clip's REC watermark */}
            <div
              aria-hidden
              className="absolute left-0 top-0 flex h-[28%] w-[27%] flex-col justify-center gap-0.5 rounded-br-2xl border-b border-r border-white/10 bg-brand-950/95 px-[2.5%] backdrop-blur sm:gap-1"
            >
              <span className="flex items-center gap-1 font-mono text-[8px] font-bold tracking-widest text-accent-400 sm:text-xs">
                <Radio className="size-2.5 sm:size-3.5" />
                CAM 01
              </span>
              <span className="truncate text-[9px] font-extrabold text-white sm:text-sm lg:text-base">
                ANBC ROBOTICS
              </span>
              <span className="hidden truncate font-mono text-[10px] text-brand-300 sm:block">
                {t("factory")}
              </span>
            </div>

            {/* Corner HUD tag */}
            <span
              aria-hidden
              className="absolute bottom-3 right-3 hidden rounded bg-black/55 px-2 py-1 font-mono text-[11px] text-emerald-300 backdrop-blur sm:block"
            >
              ● 1080P · 30FPS
            </span>
          </div>

          {/* Status strip */}
          <dl className="grid grid-cols-3 gap-2 px-1 pt-2 sm:gap-3 sm:px-2 sm:pt-3">
            {readouts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 sm:px-4 sm:py-3"
              >
                <Icon className="hidden size-5 shrink-0 text-accent-400 sm:block" aria-hidden />
                <div className="min-w-0">
                  <dt className="truncate text-[11px] text-brand-200 sm:text-xs">{label}</dt>
                  <dd className="truncate font-mono text-xs font-bold text-white sm:text-sm">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Hazard stripe accent, echoing the hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1.5 [background:repeating-linear-gradient(-45deg,#f59e0b_0_14px,#06152d_14px_28px)]"
      />
    </section>
  );
}
