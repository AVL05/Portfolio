# Repository Guidelines

## Project Mission

This repository is the professional portfolio of Alex Vicente López. Its primary goal is to present Alex clearly as a **Junior Full-Stack Developer** with real end-to-end work across frontend, backend, APIs, data, systems, and applied AI.

The site should help recruiters and product/engineering teams understand the professional profile, inspect credible project evidence, download the CV, and contact Alex quickly.

Preserve these product truths:

- Lead with full-stack capability and concrete project outcomes, not technology lists.
- Do not overstate experience, responsibility, metrics, clients, or results.
- Keep the four primary projects prominent: AI Creative Assistant, Distrito Gourmet, LumaFlow Studio, and raw.vives.
- Treat raw.vives as a web + photography case study, not as a second profession.
- Visual ambition must support readability, accessibility, performance, and the work itself.
- Avoid generic SaaS/AI portfolio aesthetics: gratuitous glassmorphism, glow-heavy UI, counters, repetitive cards, or effects without product value.

For product or visual decisions, consult `PRODUCT.md` and `DESIGN.md` before introducing a new direction.

## Stack and Runtime

Use the existing stack. Do not replace technologies unless explicitly requested.

- Next.js 16.3.4, App Router
- React 19
- TypeScript 5.7
- Tailwind CSS 4
- GSAP + `@gsap/react`, ScrollTrigger, ScrollToPlugin
- React Three Fiber / Drei / Three.js
- Radix UI, Lucide, React Icons, Geist
- Node.js 22
- pnpm 10
- Node `node:test` + Playwright
- Vercel + GitHub Actions

Package manager is pnpm. Respect `pnpm-lock.yaml`; do not switch to npm, yarn, or bun.

## Repository Map

- `app/`: routes, layouts, metadata, API endpoints, sitemap, robots, global styles.
- `components/`: page sections and reusable components.
- `components/ui/`: shared UI primitives.
- `hooks/`: reusable React hooks.
- `lib/`: i18n routing, locale state/content, SEO helpers, GSAP setup, and shared utilities.
- `public/`: production images, project media, downloadable CV, and other published assets.
- `tests/`: Node integration/contract tests.
- `tests/e2e/`: Playwright browser tests.
- `docs/`: technical documentation.
- `PRODUCT.md`: durable product positioning and content constraints.
- `DESIGN.md`: visual system, interaction principles, and design rules.

Prefer existing components, hooks, helpers, tokens, and utilities before creating new abstractions.

## Routing, i18n, and Content

Spanish lives at the root; English lives under `/en`.

Maintain ES/EN parity for public content and navigation. When changing routes, locale behavior, metadata, or indexability:

1. inspect `lib/i18n-paths.ts`;
2. reuse the existing alternate-path helpers;
3. keep Spanish and English route pairs aligned;
4. update relevant tests when contracts change.

Do not create a parallel `/es` site. Existing `/es/*` handling is intentional redirect normalization.

Current SEO contracts include 16 indexable URLs: 8 ES + 8 EN. Legal pages remain noindex and are intentionally excluded from the sitemap/indexable set.

When changing copy, keep claims factual and aligned across ES/EN. Do not invent metrics, employers, responsibilities, testimonials, or project outcomes.

## SEO and Metadata

Use `lib/seo.ts` and existing metadata helpers instead of hand-rolling canonical, hreflang, Open Graph, Twitter, or JSON-LD logic.

Preserve:

- canonical consistency with `https://www.aleviclop.dev` unless `NEXT_PUBLIC_SITE_URL` overrides it;
- reciprocal ES/EN hreflang;
- `x-default` pointing to Spanish;
- sitemap/robots consistency;
- structured data contracts;
- noindex behavior for non-indexable routes.

A routing or metadata change is incomplete until its SEO impact is checked.

## UI, Design, and Motion

Follow `DESIGN.md` as the visual authority.

Core direction: **Visual Systems / Quiet Cinema** — dark, precise, editorial, image-led, with controlled copper accent and purposeful motion.

Do not introduce a new visual language casually. In particular, avoid:

- generic SaaS card grids;
- decorative glassmorphism;
- gratuitous glow effects;
- excessive pill UI;
- repeated card-in-card layouts;
- motion added only because it is possible.

Motion has a budget: one orchestrated hero entrance, restrained list/section entrances, and purposeful state microinteractions. Avoid continuous parallax or stacked effects unless the existing design explicitly calls for them.

All non-essential motion must respect `prefers-reduced-motion`. Clean up GSAP contexts, observers, listeners, RAF loops, and Three.js resources.

## Accessibility and Responsive Behavior

Target WCAG 2.2 AA.

Preserve:

- keyboard navigation;
- visible focus states;
- semantic structure;
- sufficient contrast;
- comfortable touch targets;
- accessible forms and error messaging;
- reduced-motion alternatives.

For meaningful UI changes, verify at least the representative viewports used by Playwright:

- mobile: 390×844
- desktop: 1440×900

Do not treat desktop rendering as sufficient evidence for responsive changes.

## Three.js and Rich Media

The home experience and avatar preview use local 3D assets and route-specific CSP allowances.

Before changing Three.js/R3F loading, WASM, blob URLs, image decoding, or CSP:

- inspect `next.config.mjs`;
- preserve the minimum route-specific permissions required by the existing loaders;
- do not broaden the global CSP merely to make a local feature work;
- dispose of geometries, materials, textures, render targets, observers, and animation loops when relevant.

Prefer optimized published assets. Do not commit RAW photographs, temporary exports, unused large originals, or generated working files.

## Contact and Security

The contact flow posts to `/api/contact` and forwards to Web3Forms server-side.

- `WEB3FORMS_ACCESS_KEY` is server-only.
- Never expose secrets through `NEXT_PUBLIC_*`, client bundles, logs, fixtures, or committed files.
- Preserve validation, rate limiting, honeypot/time-trap behavior, retry behavior, and the direct-email fallback unless intentionally changing that contract.
- Never commit `.env` files or credentials.

Security headers and CSP live in `next.config.mjs`. Prefer narrow changes over weakening site-wide policy.

## Coding Conventions

Follow the surrounding code.

- Two-space indentation.
- Double quotes.
- Semicolons.
- PascalCase for React components.
- camelCase for variables/functions.
- kebab-case filenames where that convention is already used.
- Explicit types where inference is unclear.

Keep client components narrowly scoped. Prefer Server Components by default when interactivity is not required.

Do not:

- duplicate logic already provided by a helper or component;
- add a dependency when the existing stack can reasonably solve the problem;
- restructure unrelated folders;
- perform broad refactors while solving a focused task;
- convert patterns or technologies merely for stylistic preference.

## Development Commands

Use:

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

`pnpm dev` uses Turbopack. Use `pnpm dev:webpack` only when diagnosing compiler-specific behavior.

## Validation Strategy

Validation must be proportional to the change.

During implementation:

1. run the narrowest relevant check first;
2. run focused tests for the changed contract;
3. use Playwright/browser verification for behavior that depends on rendering, interaction, responsive layout, or navigation.

Before declaring a substantial change ready to publish, run the full quality gate when relevant:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Do not claim a command passed unless it was actually executed successfully. Distinguish pre-existing failures from failures introduced by the current change.

## Git and Delivery

Work on the current branch unless the user explicitly asks otherwise.

- Do not create or switch branches without instruction.
- Do not force-push or rewrite shared history.
- Do not create commits, push, or open PRs unless requested.
- Use Conventional Commits in English when a commit is requested.
- Keep commits focused.

For visual changes, include desktop/mobile verification evidence when preparing a PR.

## Working Method

Before editing:

1. inspect the files directly related to the task;
2. check existing implementations/helpers before creating new ones;
3. consult `PRODUCT.md` or `DESIGN.md` when the task affects positioning, content, UX, or visual direction;
4. consult relevant local Next.js documentation when framework behavior is version-sensitive.

While editing:

- make the smallest coherent change;
- preserve established architecture and contracts;
- avoid unrelated cleanup;
- keep ES/EN, SEO, accessibility, and responsive implications in scope when affected.

At completion, report only:

- what changed;
- relevant validation performed;
- any material limitation, risk, or follow-up.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
