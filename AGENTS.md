# AGENTS.md

## Project

Portfolio is a Next.js personal portfolio using React, TypeScript, Radix UI components, Tailwind, GSAP, and Vercel tooling.

## Stack

- Package manager: pnpm.
- Next.js app source uses `app/`, `components/`, `hooks/`, and `lib/`.
- Dev command explicitly uses webpack.
- Node requirement: `>=18.17.0`.

## Commands

- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Start: `pnpm start`

## Rules

- Preserve existing Radix/shadcn-style component patterns.
- Use existing utility helpers before adding new abstractions.
- Keep accessibility behavior intact for Radix components.
- Do not add large UI libraries; this repo already has a broad component stack.
- Maintain responsive layout and portfolio polish.

## Validation

- For UI or TypeScript changes, run `pnpm lint`.
- For route, config, or rendering changes, run `pnpm build`.
- Use browser verification for visual changes when practical.
