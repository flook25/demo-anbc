import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "zh"],
  defaultLocale: "th",
  // Always show the locale in the URL: /th, /zh
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
