---
name: Alex Vicente Portfolio — Editorial Index
description: A dark editorial portfolio where real project work is the first thing a recruiter reads
colors:
  ink-0: "#0e0d0b"
  ink-1: "#161512"
  ink-2: "#201e1a"
  ink-3: "#2c2924"
  bone: "#f1ece2"
  foreground-soft: "#d3ccc0"
  stone: "#a9a196"
  paper-0: "#ece6da"
  paper-1: "#e2dbcc"
  paper-ink: "#191714"
  paper-muted: "#575047"
  copper: "#d4895a"
  copper-deep: "#8c4a24"
  rule-dark: "#34302a"
  rule-paper: "#bfb6a5"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontStyle: italic
    fontWeight: 400
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  control: "2px"
  media: "0"
spacing:
  gutter: "clamp(1.25rem, 4.4vw, 4rem)"
  page: "90rem"
  header: "4.5rem"
  target: "2.75rem"
components:
  action-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.ink-0}"
    rounded: "{rounded.control}"
    minHeight: "3.25rem"
  action-secondary:
    border: "1px solid foreground 34%"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
---

# Design System: Editorial Index

Current direction since 2026-11-05. It replaces the 2026-10 "studio sculpture"
direction (black, ivory and lime with a chrome hero object) and the earlier
ALEVICLOP 2.x experiments. Those decisions are historical; the redesign record,
the three explored directions and the evidence live in
[docs/EDITORIAL_INDEX_REDESIGN.md](docs/EDITORIAL_INDEX_REDESIGN.md).

**Visual thesis.** The work is the interface: the portfolio reads like a
printed index of real projects, set in confident type, with each project shown
as a large art-directed spread and its engineering facts written beside it.

**Ambition:** Immersive, expressed through composition and one signature
interaction rather than WebGL. No new dependencies.

## Colour

One warm-black workspace, one paper chapter and one accent.

- `ink-0` page, `ink-1` raised chapters and alerts, `ink-2` media wells.
- `bone` primary text, `foreground-soft` reading text, `stone` metadata.
  Text is always opaque; secondary text never uses translucent colour.
- `copper` is the only accent: primary action, active state, numbers, accent
  phrases. On paper it becomes `copper-deep` to keep AA.
- The paper surface (`.surface-paper`) is used once on the home page, for the
  profile chapter (capabilities and experience), so the CV reads as a document.
- Case-study heroes carry a project identity through local tokens on
  `[data-case]`: Distrito Gourmet on paper with green `#2f4a3c`, LumaFlow
  Studio on ink with copper, raw.vives on night green `#0f1615` with
  `#d9a27c`. Chapters below the hero return to the shared system.

Measured contrast (WCAG): copper on ink 6.96:1, stone on ink 7.6:1,
placeholder `#958d82` on ink ≈5.7:1, ink on copper 6.96:1.

## Typography

- **Geist** for display and reading, 500 for headings, 400 for body.
  Display is capped at 6rem with −0.04em tracking.
- **Instrument Serif italic** is reserved for short accent phrases: the role
  in the hero, the second half of section headings and `raw.vives`. Never for
  paragraphs.
- **Geist Mono** only for data and metadata: dates, numbers, stack names,
  captions, breadcrumb. Not as decoration.
- No eyebrow or kicker above headings. Metadata follows the heading it
  describes. Numbers appear only where sequence is information (project
  index, chapter column on desktop).

## Layout

- 12-column grid, `--page-width` 90rem, fluid gutter.
- Hero: name and role (h1) left, introduction, actions and links right; the
  project index and the live plate share the lower band, so name, position,
  CV, contact and all three projects are visible in a 1440×900 first viewport.
- Selected work: three spreads, each with a large primary plate and an offset
  companion view (bottom-right overlap, bottom-left overlap, staggered
  diptych), then a facts ledger (my part, evidence, stack) and actions.
- Archive: a single ledger list, not a card grid.
- Case studies: shared `CaseShell` (top bar, breadcrumb, title, lead, facts,
  actions, full-width showcase, contents) and numbered `Chapter` sections
  with a sticky label column on desktop.
- Breakpoints: 1024 (single column, plate hidden, thumbnails in the index),
  640 (stacked ledgers, companion views hidden), 480 (compact hero).

## Components and states

- `.action-primary` / `.action-secondary`: 2px radius, 52px tall, icon at the
  trailing edge. Hover swaps to bone; focus uses the global copper outline.
- `.cinema-link`: text link with a 44px target.
- Form fields: underline inputs, mono labels, inline errors in text plus
  colour, `aria-invalid` border, 1px bordered success/error panels with retry
  and direct-email fallback.
- Navigation: transparent bar that becomes solid on scroll, desktop links plus
  CV, language toggle and the native `<dialog>` menu on every size.
- Browser surfaces: themed selection, caret and scrollbar.

## Motion

Budget: one authored moment plus restrained reveals.

1. **Signature — the project plate.** Hovering (fine pointer) or focusing an
   index row wipes the plate to that project with a 650ms `clip-path` reveal
   and a slight image settle. With reduced motion it swaps instantly.
   Clicking claims the project's `view-transition-name`, so the plate morphs
   into the case-study showcase on supporting browsers.
2. Hero entrance: masked line rise, plate wipe and index rows, skipped when
   hydration is late.
3. Scene reveals once per project (title, plate mask, companion), completed
   on fast scroll.

No parallax, no sticky stacking, no permanent loops. Every effect lives in a
`gsap.matchMedia` reduced-motion branch and reverts cleanly.

## Imagery

Only real screenshots, recorded-demo frames and Alex's own photographs. Captions
say what each image is (published site, sample data, demo frame). Distrito's
home plate uses the published site capture; no private or proprietary assets.

## Acceptance criteria

- Name, role, CV, contact and the three projects visible without scrolling at
  1440×900; name, role, both actions at 390×844.
- No horizontal overflow at 320, 390, 768, 1440 and 1920.
- Keyboard: every row, plate action and form control reachable with a visible
  focus ring; the menu dialog traps and restores focus.
- Reduced motion: no transforms remain after a live preference change.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` and the Playwright
  suite pass.
