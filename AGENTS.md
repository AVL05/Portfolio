# Portfolio — Repository Instructions

## 1. Purpose

This repository powers the professional portfolio of Alex Vicente López.

Its job is to help recruiters, hiring managers, and product/engineering teams understand Alex quickly as a **Junior Full-Stack Web Developer** (Spanish: *Desarrollador Web Full-Stack Junior*) through credible project evidence, professional experience, technical decisions, and clear contact paths.

The site is not a generic developer showcase and not a photography-first portfolio. It is a single framed column: introduction, about, experience, projects, skills, education and contact.

### Product truths

Preserve these unless the user explicitly changes the product direction:

- Use one positioning label everywhere (UI, metadata, JSON-LD, Open Graph, manifest): **Desarrollador Web Full-Stack Junior** / **Junior Full-Stack Web Developer**. No competing labels ("AI builder", "digital creator", "frontend focus").
- Show end-to-end capability through real work: frontend, backend, APIs and data. AI is a development tool Alex uses and validates with tests, not a headline.
- Prefer project decisions and outcomes over technology inventories.
- Never invent or exaggerate experience, responsibilities, clients, metrics, testimonials, or results.
- Keep these three projects as the featured work, in this order:
  - Distrito Gourmet
  - LumaFlow Studio
  - raw.vives
- Secondary work stays compact ("Other projects"): Premium Frontend Director, ECHO: The Awakening, the hotel management API and the Christmas shop.
- Do not advertise TypeScript as a skill or as a project chip. Do not claim certifications.
- Show a Live link only when the demo URL is published and answering (LumaFlow Studio has none).
- Treat raw.vives as a web + photography case study, not as a second profession.
- Keep the path to projects, CV, and contact obvious.
- Visual ambition must never compromise readability, accessibility, responsive behavior, or performance.

For product positioning and copy decisions, `PRODUCT.md` is authoritative.

For visual and interaction decisions, `DESIGN.md` is authoritative.

---

## 2. Decision Priority

When instructions appear to conflict, use this order:

1. explicit user request;
2. existing functional/product contracts;
3. `PRODUCT.md`;
4. `DESIGN.md`;
5. this `AGENTS.md`;
6. established implementation patterns in nearby code.

Do not introduce a new architecture, design language, route model, localization model, or dependency merely because another approach is preferable in isolation.

---

## 3. Stack

Preserve the existing stack:

- Next.js 16
- App Router
- React 19
- TypeScript 5.7
- Tailwind CSS 4
- GSAP, `@gsap/react` and ScrollTrigger (case-study pages only; the home uses CSS and one IntersectionObserver)
- Radix UI
- Lucide
- React Icons
- Hanken Grotesk and JetBrains Mono through `next/font` (self-hosted)
- Node.js 22
- pnpm 10
- Node `node:test`
- Playwright
- Vercel
- GitHub Actions

Use **pnpm only**.

Respect `pnpm-lock.yaml`.

Do not migrate package manager, framework, router, styling system, animation stack, or language unless explicitly requested.

---

## 4. Repository Map

Use this map before searching broadly:

- `app/`
  Routes, layouts, metadata, API endpoints, sitemap, robots, global styles.
- `components/`
  Page sections and reusable components.
- `components/ui/`
  Shared UI primitives.
- `hooks/`
  Reusable React hooks.
- `lib/`
  i18n, SEO, locale/content state, GSAP setup, shared utilities.
- `lib/locales/`
  Localized ES/EN content.
- `public/`
  Published media, CV, images and icons.
- `tests/`
  Node integration and contract tests.
- `tests/e2e/`
  Playwright browser tests.
- `docs/`
  Technical documentation.
- `PRODUCT.md`
  Product positioning and durable content rules.
- `DESIGN.md`
  Visual system and interaction authority.
- `next.config.mjs`
  Next.js configuration, security headers, CSP, redirects.
- `lib/i18n-paths.ts`
  Source of truth for ES/EN route relationships.
- `lib/seo.ts`
  SEO URLs, metadata helpers and structured-data contracts.

Inspect the smallest relevant part of the repository first. Expand only when the task crosses boundaries.

---

## 5. Routing and Internationalization

Spanish is the default locale and lives at the root.

English lives under `/en`.

Examples:

```text
/                              ↔ /en
/proyectos/raw-vives           ↔ /en/projects/raw-vives
/proyectos/lumaflow-studio     ↔ /en/projects/lumaflow-studio
/proyectos/distrito-gourmet    ↔ /en/projects/distrito-gourmet
/legal                         ↔ /en/legal   (navigable, not indexable)
```

Retired section pages (`/proyectos`, `/sobre-mi`, `/fotografia`, `/contacto` and their English forms) redirect once to the matching home anchor.

`lib/i18n-paths.ts` is the source of truth for indexable ES/EN route pairs.

### Rules

- Keep public ES and EN content in parity.
- Do not create a parallel `/es` site.
- Existing `/es/*` behavior is intentional redirect normalization.
- Brand project slugs remain stable across locales.
- Reuse existing localization helpers.
- Do not hand-roll alternate-route logic in individual components.

If a change affects routes, navigation, locale switching, metadata, sitemap, canonical URLs, or hreflang, inspect `lib/i18n-paths.ts` first.

---

## 6. SEO Contracts

`lib/seo.ts` and existing metadata helpers are authoritative.

Do not duplicate SEO logic in individual routes.

Preserve:

- canonical consistency;
- reciprocal ES/EN hreflang;
- `x-default` → Spanish;
- sitemap/indexability consistency;
- robots behavior;
- Open Graph and Twitter metadata;
- structured data;
- noindex behavior for non-indexable routes.

Current public indexable contract:

- 4 Spanish URLs (home plus three case studies);
- 4 English URLs;
- 8 indexable URLs in total.

Legal routes remain intentionally outside the indexable set.

Default canonical origin:

```text
https://www.aleviclop.dev
```

unless overridden by:

```text
NEXT_PUBLIC_SITE_URL
```

A route or metadata change is incomplete until its SEO consequences are checked.

---

## 7. Content Integrity

All public claims must remain factual.

Do not invent:

- employment history;
- responsibilities;
- technologies used in a project;
- users;
- revenue;
- performance gains;
- conversion metrics;
- client relationships;
- testimonials;
- project outcomes.

When changing professional copy, maintain semantic consistency between Spanish and English.

Do not translate mechanically when that produces unnatural professional language; preserve meaning and positioning.

---

## 8. Design System

`DESIGN.md` is the visual authority.

Creative direction:

**Framed Column**

The portfolio should feel:

- dark by default, with an equally careful light theme;
- a single centered column framed by thin vertical rules, sections separated by horizontal rules and titled in a strip;
- precise and quiet, with one copper accent;
- fast: self-hosted fonts, optimized images, no heavy libraries on the home.

Avoid:

- generic SaaS layouts;
- gratuitous glassmorphism;
- purple/blue AI gradients;
- excessive glow;
- cards nested inside cards;
- effects added only to demonstrate technique.

Do not redesign an existing surface unless the task calls for it.

Prefer extending the current visual language over introducing another one.

---

## 9. Motion

Motion must have a purpose.

Current motion budget:

- restrained section entrances (CSS plus one IntersectionObserver, skipped for reduced motion and when the visit starts on an anchor);
- a short colour cross-fade when the theme changes;
- hover, focus and press states, and the command palette opening.

Avoid:

- continuous parallax by default;
- stacked reveal effects;
- excessive scroll-linked motion;
- animation on every section;
- decorative animation that delays content.

All non-essential motion must respect:

```css
prefers-reduced-motion
```

When using GSAP:

- scope animations correctly;
- clean up GSAP contexts;
- remove listeners and observers;
- terminate RAF loops;
- avoid duplicate ScrollTriggers;
- avoid layout-thrashing animation properties when a cheaper alternative exists.

---

## 10. React and Next.js

Prefer Server Components unless client-side behavior is actually required.

Keep `"use client"` boundaries narrow.

Do not move code client-side merely for convenience.

Reuse existing:

- components;
- hooks;
- helpers;
- SEO utilities;
- localization utilities;
- animation infrastructure.

Before implementing version-sensitive Next.js behavior, consult the local Next.js documentation bundled with the installed version.

Do not rely on remembered behavior when local Next.js 16 documentation contradicts it.

---

## 11. Rich Media

The site ships no 3D. Media are optimized images (AVIF/WebP through `next/image`) and the three Distrito Gourmet videos (`preload="none"`, played on demand).

Before adding any media pipeline (WASM, blob URLs, canvases), inspect `next.config.mjs` for the route CSP.

### Rules

- Keep CSP permissions as narrow as possible.
- Do not weaken the global CSP to fix a route-specific feature.
- Dispose of observers, listeners and animation loops.
- Prefer optimized production assets with explicit dimensions.
- Do not commit RAW photography.
- Do not commit temporary renders or generated working files.
- Do not retain unused large assets.

---

## 12. Contact Flow and Security

The contact form posts to:

```text
POST /api/contact
```

and forwards to Web3Forms server-side.

`WEB3FORMS_ACCESS_KEY` is server-only.

Never expose secrets via:

- `NEXT_PUBLIC_*`;
- client bundles;
- logs;
- fixtures;
- source control.

Preserve unless intentionally modifying the contract:

- validation;
- rate limiting;
- honeypot;
- time trap;
- retry behavior;
- direct-email fallback;
- draft preservation behavior.

Security headers and CSP live in `next.config.mjs`.

Prefer narrow security changes over broad relaxations.

Never commit `.env` files or credentials.

---

## 13. Accessibility

Target:

**WCAG 2.2 AA**

Preserve:

- semantic HTML;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- accessible names;
- appropriate heading structure;
- comfortable touch targets;
- accessible form validation;
- accessible error states;
- reduced-motion alternatives.

Do not use color as the only error/state indicator.

For meaningful UI changes, verify both representative viewports:

```text
Mobile:  390 × 844
Desktop: 1440 × 900
```

These match the Playwright configuration.

Desktop-only verification is not sufficient for responsive UI changes.

---

## 14. Coding Conventions

Follow surrounding code.

Default conventions:

- two-space indentation;
- double quotes;
- semicolons;
- PascalCase React components;
- camelCase variables/functions;
- explicit types where inference is unclear;
- existing filename conventions.

Prefer the smallest coherent implementation.

Do not:

- duplicate existing logic;
- create abstractions for one-off behavior without a real need;
- add dependencies when the existing stack is sufficient;
- restructure unrelated folders;
- perform opportunistic broad refactors;
- rewrite functioning code solely for stylistic preference.

---

## 15. Validation

Validation must be proportional to the change.

### Small isolated change

Run the narrowest relevant validation.

Examples:

```bash
pnpm lint
pnpm typecheck
```

or a focused test.

### Logic / contract change

Run relevant tests in addition to type/lint checks.

### UI / responsive / interaction change

Use browser verification and, when appropriate:

```bash
pnpm test:e2e
```

Verify both desktop and mobile behavior.

### Routing / SEO / localization change

Check:

- route mapping;
- ES/EN parity;
- metadata;
- canonical;
- hreflang;
- sitemap/indexability contracts;
- relevant tests.

### Substantial pre-release change

When relevant, use the complete quality gate:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Do not run the entire suite unnecessarily for a trivial isolated change.

Never claim a validation passed unless it actually ran successfully.

Separate pre-existing failures from failures introduced by the current work.

---

## 16. Development Commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm dev:webpack
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm start
```

`pnpm dev` uses Turbopack.

Use `pnpm dev:webpack` only when investigating compiler-specific behavior.

Playwright development server defaults to:

```text
http://127.0.0.1:3100
```

---

## 17. Task Routing

Before editing, identify the task class and inspect only the relevant authorities.

### Copy / professional positioning

Read:

```text
PRODUCT.md
relevant locale/content files
```

### UI / visual changes

Read:

```text
DESIGN.md
target component
related shared primitives/tokens
```

### Routing / i18n

Read:

```text
lib/i18n-paths.ts
affected routes/navigation
relevant tests
```

### SEO

Read:

```text
lib/seo.ts
affected metadata/route
relevant tests
```

### Contact/security

Read:

```text
/api/contact implementation
next.config.mjs when headers/CSP are involved
related tests
```

### Media

Read:

```text
lib/projects.ts
target component
next.config.mjs when CSP is involved
```

Do not scan the entire repository before every task.

---

## 18. Completion Criteria

A task is complete when:

1. the requested behavior is implemented;
2. established product/architecture contracts remain intact;
3. relevant validation has passed;
4. no errors introduced by the change remain;
5. ES/EN, SEO, accessibility, responsive, security, and motion implications have been checked when applicable.

At completion report only:

- what changed;
- validation actually performed;
- material limitations, risks, or follow-up.

---

## 19. Git

Work on the current branch.

Do not:

- create or switch branches unless requested;
- force-push;
- rewrite shared history;
- commit;
- push;
- create a Pull Request;

unless explicitly requested.

When a commit is requested, use Conventional Commits in English and keep it focused.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
