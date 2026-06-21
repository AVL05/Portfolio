# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (uses webpack explicitly, not Turbopack)
pnpm build      # Production build
pnpm lint       # ESLint
pnpm start      # Serve production build
```

Package manager: **pnpm** (required). Node 22.x.

## Architecture

Single-page portfolio built with **Next.js 16 (App Router)** + **React 19** + **Tailwind CSS v4** + **GSAP**.

### Page structure

The root page (`app/page.tsx`) renders `<HomeClient />`, which dynamically imports all sections (lazy-loaded after Hero). Order: `Navigation → Hero → Projects → Skills → Experience → Photography → Contact`.

All sections are self-contained components in `components/`. The page is a dark-mode SPA that scrolls to `#anchor` IDs — there are no sub-routes for content.

### i18n (ES/EN)

All user-facing strings live in `lib/locales/es.json` and `lib/locales/en.json`. Never hardcode text in components — always use `useLanguage()` → `t.*`. Language is persisted to a cookie (server-side initial read in `layout.tsx`) and localStorage (client-side sync). Adding a new string requires updating **both** locale files with matching keys.

### GSAP pattern

GSAP is centrally initialized in `lib/gsap.ts` (registers ScrollTrigger, ScrollToPlugin, useGSAP; sets defaults). Always import from `@/lib/gsap`, never directly from `gsap`. Every animation must check `prefersReducedMotion()` and fall back to `gsap.set(..., { opacity: 1, y: 0 })`. Use `useGSAP({ scope: containerRef })` for cleanup.

### CSS architecture

Global styles in `app/globals.css` (Tailwind v4 with `@import 'tailwindcss'`). Key utility classes defined there:
- `.premium-card` — glass card with noise texture and spotlight hover
- `.dev-panel` — lighter card variant
- `.section-padding` — standard section vertical spacing (`py-20 sm:py-28 md:py-32`)
- `.bg-grid` — dot grid overlay for hero
- `.animate-marquee` — infinite horizontal scroll animation

Colors use `oklch()` tokens. Both light and dark tokens are defined; the site ships with `class="dark"` fixed on `<html>`.

### Styling conventions

- Tailwind v4 — do **not** add `tailwindcss` to `postcss.config.mjs`; it uses `@tailwindcss/postcss`.
- Radius token: `--radius: 0.875rem`. All interactive elements use `rounded-xl` or `rounded-2xl`.
- Primary color: teal/cyan (`oklch(0.72 0.18 195)` in dark mode). Accent: amber (`oklch(0.78 0.14 65)`).
- Icons: `lucide-react` and `react-icons` are both used. Keep using them consistently; don't mix in a third library.

### Contact form

Uses Web3Forms API (`https://api.web3forms.com/submit`). The access key is hardcoded in `components/contact.tsx` — this is intentional (public-facing key, not a secret).

### SEO / OG

SEO constants in `lib/seo.ts`. OG image generated dynamically at `/api/og` (route handler). Structured data (JSON-LD) injected in `layout.tsx`.

### Photography section

Links to an external gallery at `gallery.aleviclop.dev`. The hero photo is at `public/photography/hero.webp`.
