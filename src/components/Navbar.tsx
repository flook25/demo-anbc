"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, PhoneCall, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { href: "#solutions", key: "solutions" },
  { href: "#why", key: "why" },
  { href: "#process", key: "process" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-slate-200 shadow-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="ANBC Smart Technology">
          <Image
            src="/pictures/logo.png"
            alt="Thailand ANBC logo"
            width={990}
            height={170}
            priority
            className="h-7 w-auto sm:h-8 lg:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="text-[15px] font-medium text-slate-700 transition-colors hover:text-brand-600"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-bold text-brand-950 shadow-sm transition-colors hover:bg-accent-400 lg:inline-flex"
          >
            <PhoneCall className="size-4" aria-hidden />
            {t("cta")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 shadow-lg sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-slate-100 py-3 text-base font-medium text-slate-700"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <LanguageSwitcher className="sm:hidden" />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-3 text-sm font-bold text-brand-950 sm:flex-none"
            >
              <PhoneCall className="size-4" aria-hidden />
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
