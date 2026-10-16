# ANBC Smart Technology — Landing Page

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (Thai / Chinese) · lucide-react

## Run

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /th or /zh
npm run build && npm start
```

## Recreate from scratch

```bash
npx create-next-app@latest anbc-landing --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd anbc-landing
npm i next-intl lucide-react
mkdir -p public/pictures && cp ../pictures/loco.png public/pictures/logo.png
```

## Structure

```
messages/th.json, zh.json         translations (keep keys identical)
public/pictures/logo.png          logo (cropped from ../pictures/loco.png)
src/proxy.ts                      locale redirect (Next 16 name for middleware.ts)
src/i18n/routing.ts               locales: th (default), zh
src/i18n/request.ts               loads messages per locale (via next/root-params)
src/i18n/navigation.ts            locale-aware Link / usePathname
src/config/company.ts             company name, tax ID, phone, email, LINE
src/app/[locale]/layout.tsx       <html>, fonts, metadata, NextIntlClientProvider
src/app/[locale]/page.tsx         landing page
src/components/                   Navbar, LanguageSwitcher, Hero, Features,
                                  WhyChooseUs, ContactCTA, Footer
```

## Editing

- Text: `messages/*.json`. Contact details: `src/config/company.ts`.
- Colors: `@theme` block in `src/app/globals.css` (`brand-*` deep blue, `accent-*` amber, `slate-*` steel gray).
- Add a language: add it to `routing.ts`, create `messages/<code>.json`, add a label in `LanguageSwitcher.tsx`.
