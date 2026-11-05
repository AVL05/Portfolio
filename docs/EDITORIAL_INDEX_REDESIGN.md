# Editorial Index redesign (2026-11-05)

Comprehensive frontend redesign of the portfolio. Profile: Premium.
Ambition: Immersive. Authority after this change: [DESIGN.md](../DESIGN.md).

## Starting point

Inspected: AGENTS.md, PRODUCT.md, DESIGN.md, README, EXPERIENCE_REDESIGN.md,
all home and case components, locale data, media and the rendered site at
390×844 and 1440×900.

- **Strengths kept:** real product screenshots and demo videos, factual
  bilingual copy, accessible dialog navigation, contact hardening, SEO and
  route contracts, GSAP infrastructure with reduced-motion handling.
- **Weaknesses addressed:** the first viewport was dominated by an abstract
  chrome sculpture and a tagline, so no project was visible until the second
  screen; three bordered cards repeated one layout; every section used a
  different palette (lime, ivory, green), so the page read as patchwork; three
  case studies used three unrelated implementations, with oversized result
  headlines and dense bordered lists; layered descendant overrides in
  `globals.css` fought the components.
- **Conflicting sources:** AGENTS.md lists four featured projects (including
  "AI Creative Assistant") and an 8+8 route set with `/sobre-mi`, `/contacto`,
  `/fotografia`. The implementation, PRODUCT.md and the tests define three
  featured projects and four indexable routes per locale, and explicitly
  assert that AI Creative Assistant is absent. No content exists for a fourth
  case, so none was invented. AGENTS.md was left unchanged for the owner to
  reconcile.

## Three directions

| | A. Editorial Index | B. Spatial Gallery | C. Systems Blueprint |
|---|---|---|---|
| Idea | The hero *is* an index of real projects with a live screenshot plate | WebGL wall of project planes with a camera dolly | Drawing-sheet grid, annotated screenshots, architecture diagrams |
| Differentiation | High: typographic index plus plate wipe is uncommon | High, but a common "creative dev" trope | Medium-high |
| Credibility / recruiter use | Highest: work visible in the first viewport | Content hidden behind interaction | High, but reads cold |
| Technical storytelling | Facts ledger next to every spread | Weak | Strongest |
| Mobile, a11y, performance | Native HTML, no new deps | Needs Three.js (not installed), heavy on mobile | Good |
| Complexity | Medium | High | Medium |

**Chosen: A**, with C's engineering annotations folded into the case studies
(facts ledgers, stack grids, numbered chapters). B was rejected because it
needs a new dependency and hides content behind a technique.

## Signature moment

The hero index rows drive a shared plate: pointer hover or keyboard focus
wipes the plate to that project (650ms clip-path, image settle); reduced
motion swaps instantly. Clicking assigns the project's unique
`view-transition-name` to the activated image only, so cross-document view
transitions can morph it into the case-study showcase.

## What changed

- Tokens: warm black, paper, copper; opaque soft text tokens; font aliases
  resolved on `body` (next/font variables live there). Fonts reduced from five
  families to three (Geist, Geist Mono, Instrument Serif).
- Home: new hero and index (`components/hero.tsx`, `lib/featured-work.ts`),
  three art-directed spreads plus an archive ledger (`projects.tsx`), a paper
  CV chapter (`skills.tsx`, `experience.tsx`, `profile.module.css`), a
  justified photography contact sheet, a restyled currently strip and a new
  contact layout. Contact logic, validation, honeypot, time trap, retry,
  draft preservation and fallback were not touched.
- Case studies: shared `CaseShell` and `Chapter` in
  `project-case-study.tsx`, used by LumaFlow, Distrito Gourmet (editorial
  story) and raw.vives, with per-project hero identities.
- Navigation: full-width bar, CV link, labelled menu trigger.
- Removed: chrome sculpture usage, hover-only preview swap, sticky scale
  stacking, `reveal-header.tsx` (no longer used).
- Copy: only new UI labels (index title and hint, contact CTA, chapter
  headings) in both languages. Spanish dates normalised (`mar. 2024 — jun.
  2024`, `2024 — 2026`). No professional facts were changed or added.
- Critique pass: removed kickers above headings, capped display type at 6rem
  and −0.04em tracking, removed a duplicated role from the nav, replaced 2px
  border-left alerts, themed caret and scrollbar, fixed 320px action overflow.

`public/experience/chrome-form.webp` is no longer referenced by the UI and
could be deleted in a follow-up.

## Validation (Node 24.22.2, pnpm 10.34.1)

- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test`: PASS, 61/61
- `pnpm build`: PASS, 16 static routes plus two dynamic API routes
- Playwright against the production build (`next start`), run through the
  locally installed Microsoft Edge because Playwright's bundled Chromium is
  not installed: PASS, 163 passed, 17 skipped (optional capture/audit
  matrices gated by environment variables).
- Browser review: 320, 390, 768, 1440 and 1920 px, no horizontal overflow,
  no console errors; hover and keyboard plate swap verified.
- Contact was exercised only with mocked `/api/contact` responses; no real
  message was sent.

Updated test contracts (old visuals, same intent): hero identity text and
fonts, plate interaction replacing the sculpture pointer test, hero index
destinations, static companion views replacing the hover preview, unique
view-transition names, archive ledger, scene caption scoping, 404 background
token, photography focus colour and case-navigation selector specificity.

Not run: Lighthouse or field Core Web Vitals, Safari/Firefox, `pnpm test:e2e`
with the bundled Chromium.
