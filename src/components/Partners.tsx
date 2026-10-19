import { useTranslations } from "next-intl";

// Text wordmarks for now. To use logo files later, put them in
// public/pictures/partners/ and render <Image /> in place of the name.
const partners = ["OMRON", "Panasonic", "Mitsubishi", "Midea", "BYD", "Huawei"];

function PartnerList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 gap-6 pr-6 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {partners.map((name) => (
        <li
          key={name}
          className="flex h-20 min-w-44 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-xl font-extrabold tracking-wide text-slate-400 transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  const t = useTranslations("Partners");

  return (
    <section id="partners" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 text-balance sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Two identical lists scroll by -50% for a seamless loop */}
        <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
            <PartnerList />
            <PartnerList hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
