# Portfolio — Repository Instructions

## Product and design

- This portfolio presents Alex Vicente López as a **Desarrollador Web Full-Stack Junior** / **Junior Full-Stack Web Developer**. Use that positioning throughout the UI, metadata, structured data and manifest.
- [PRODUCT.md](PRODUCT.md) governs public copy and claims. [DESIGN.md](DESIGN.md) governs layout, themes, interaction and motion. Explicit user requests and existing functional contracts take precedence.
- Keep Sinergia, LumaFlow Studio and raw.vives featured in that order. Keep Premium Frontend Director, ECHO: The Awakening, the hotel API, the Christmas shop, Distrito Gourmet and RaceFinder under “Show more”.
- Use factual, localized copy. Do not invent credentials, outcomes or metrics, advertise TypeScript as a skill or project chip, or present photography as a separate profession. Show a live demo only if published and responding. LumaFlow Studio has no live demo.
- Keep a clear path to the projects, CV and contact. Preserve the framed column, the copper accent, and both carefully maintained themes unless asked to redesign.

## Implementation

- Use Node.js 22 and pnpm 10 with the existing lockfile. Preserve Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, the self-hosted Hanken Grotesk and JetBrains Mono fonts, and the existing deployment and CI tooling.
- Follow nearby conventions. Prefer Server Components and keep client boundaries narrow. Reuse existing components, tokens and helpers. Make focused changes and ask before introducing a production dependency. Read the relevant local Next.js guide before writing code.
- The home uses CSS and a single IntersectionObserver. Respect reduced motion. Avoid motion or effects that delay content.
- Use Next.js Image with optimized media and explicit dimensions. Check the route CSP before adding a new media pipeline. Keep RAW files, working renders and unused large media out of source control.
- Target WCAG 2.2 AA. Preserve semantic headings, keyboard access, visible focus, accessible control names, text errors, and comfortable touch targets. Check meaningful UI changes at 390 × 844 and 1440 × 900.

## Routes, content and SEO

- Spanish is at the root. English is under `/en`. Keep parity and stable project slugs. Use `lib/i18n-paths.ts` for route equivalences and preserve the current section anchors and single-hop redirects, including normalization from `/es`.
- Use `lib/seo.ts` for canonical URLs, metadata and structured data. Preserve reciprocal hreflang, Spanish `x-default`, social metadata, robots and sitemap consistency. The sitemap contains the Spanish and English home pages. Legal pages are navigable and noindex. The default origin is `https://www.aleviclop.dev`.
- Edit home content in `lib/locales/` and project links and thumbnails in `lib/projects.ts`. Retired project pages redirect to the Projects section of the corresponding home.

## Contact and security

- `POST /api/contact` sends through Web3Forms with server-only `WEB3FORMS_ACCESS_KEY`. Preserve validation, rate limits, honeypot, time trap, retries, drafts and email fallback.
- Security headers, CSP and redirects live in `next.config.mjs`. Keep permissions narrow and route-specific. Keep credentials out of source control, public environment variables, bundles, fixtures and logs.

## Verification and Git

- Check Git status before editing and preserve unrelated changes. Work on the current branch. Do not commit, push, merge, rebase, force-push, create a branch or PR, or change deployment settings or production resources without authorization.
- Use the narrowest meaningful check. Typical checks are `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` and `pnpm test:e2e`. Browser tests use port 3100. Use `pnpm dev:webpack` only to diagnose compiler differences. Check routing and SEO consequences when relevant.
- Report what changed, what was verified and material limitations in Spanish. Use English Conventional Commits when a commit is requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
