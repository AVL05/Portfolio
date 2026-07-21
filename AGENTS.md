# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router portfolio built with React 19 and TypeScript.

- `app/`: routes, layouts, metadata, global styles, sitemap, and robots files.
- `components/`: page sections and reusable UI. Shared primitives live in `components/ui/`.
- `lib/`: language state, GSAP setup, SEO helpers, and other shared utilities. Keep ES/EN content aligned in `lib/locales/`.
- `hooks/`: reusable React hooks.
- `public/`: production assets, including project media, selected photography, and the downloadable CV.
- `tests/`: Node test files; current integration coverage is in `raw-vives-integration.test.mjs`.
- `docs/` and root `PRODUCT.md` / `DESIGN.md`: product, content, and visual direction references.

## Build, Test, and Development Commands

Use Node.js 22 and pnpm 10.

```bash
pnpm install          # install locked dependencies
pnpm dev              # run the local Next.js server with webpack
pnpm lint             # run ESLint across the repository
pnpm typecheck        # validate TypeScript without emitting files
pnpm test             # run Node integration tests
pnpm build            # create the production build
pnpm start            # serve an existing production build
```

Before submitting changes, run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

## Coding Style & Naming Conventions

Follow the existing TypeScript style: two-space indentation, double quotes, semicolons, and explicit types where inference is unclear. Use PascalCase for React components, camelCase for variables and functions, and kebab-case filenames such as `custom-cursor.tsx`. Prefer existing components, hooks, Tailwind utilities, and GSAP helpers over duplicate abstractions. Keep client components narrowly scoped and clean up animation contexts, observers, and listeners. All motion must respect `prefers-reduced-motion`.

## Testing Guidelines

Tests use Node's built-in `node:test` runner. Name new files `*.test.mjs` and place them in `tests/`. Add focused coverage for routes, localized content, metadata, and asset contracts. No coverage threshold is enforced; regressions affecting published projects or ES/EN parity should include a test.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching history: `fix(photography): prevent desktop content clipping`. Keep commits focused and written in English. Pull requests should explain the problem, summarize the implementation, list validation commands, and include desktop/mobile screenshots for visual changes. Note any routing, SEO, accessibility, or deployment impact.

## Security & Assets

Never commit `.env` files, secrets, temporary exports, RAW photographs, or unused large originals. Only reference assets tracked under `public/`. Production deploys from `main` through CI and Vercel; do not force-push or rewrite shared history.
