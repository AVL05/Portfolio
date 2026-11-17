---
name: Alex Vicente Portfolio: Framed Column
description: A dark-first, single-column portfolio framed by thin rules, with one copper accent and an equally careful light theme
colors:
  dark:
    background: "#0f0e0d"
    surface: "#161513"
    foreground: "#ece8e1"
    foreground-soft: "#cfc9bf"
    muted: "#9d968c"
    faint: "#8f887e"
    border: "#2a2724"
    input: "#7a7368"
    dot: "#3a3631"
    primary: "#e0956a"
    on-primary: "#0f0e0d"
    destructive: "#ff9f8f"
  light:
    background: "#f6f3ee"
    surface: "#efebe4"
    foreground: "#1a1814"
    foreground-soft: "#3a352e"
    muted: "#5f584e"
    faint: "#6a6359"
    border: "#d9d3c8"
    input: "#8a8377"
    dot: "#cfc8bb"
    primary: "#8f4a24"
    on-primary: "#ffffff"
    destructive: "#b3261e"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  control: "0.5rem"
  card: "0.75rem"
  pill: "999px"
spacing:
  column: "48.75rem"
  columnPad: "clamp(1.25rem, 5vw, 2.5rem)"
  header: "3.75rem"
  target: "2.75rem"
components:
  pill-primary:
    backgroundColor: "{colors.dark.primary}"
    textColor: "{colors.dark.on-primary}"
    rounded: "{rounded.pill}"
    minHeight: "2.75rem"
  pill-secondary:
    border: "1px solid foreground 28%"
    rounded: "{rounded.pill}"
    minHeight: "2.75rem"
---

# Design System: Framed Column

## Overview

**Creative direction.** A single centered column (780 px) framed by thin vertical rules on wide screens and edge to edge on phones. Sections are separated by horizontal rules and titled in a strip (`/ SECCIÓN`, mono, uppercase). A subtle dot band sits above the introduction. Everything is quiet, precise and fast; real project work is the content.

**Themes.** Dark is the default and the no-JavaScript state. Light is chosen with the header toggle and stored in `localStorage` (`theme`); an inline head script applies it before first paint. Tokens switch on `[data-theme]` in `app/globals.css`. Case-study pages keep their own dark surfaces (`data-theme="dark"` on the page).

**One accent.** Copper: `#e0956a` on dark, `#8f4a24` on light. All text pairs meet WCAG AA (measured: foreground 15.8:1 and 16.0:1, muted 6.6:1 and 6.3:1, primary on background 8.0:1 and 6.0:1, on-primary 8.0:1 and 6.6:1). Input borders are at least 3:1 against their surface.

## Typography

Hanken Grotesk for headings and reading, JetBrains Mono for the wordmark, section strips, dates and metadata. Both are self-hosted through `next/font` with `display: swap`. No serif.

## Layout

- `.site-column` holds header content, main and footer at `--column-width`.
- `.section-strip` (title) and `.section-body` (padding `--column-pad`) make up every section; `Section` in `components/section.tsx` is the only way to add one.
- Section ids are stable anchors used by redirects and the command palette: `about`, `experience`, `projects`, `other`, `skills`, `education`, `contact`.
- Header: wordmark `aleviclop.dev`, links from 768 px (a modal menu below), palette button from 480 px, theme toggle and ES/EN switch.

## Components

- **Pills** (`.pill`, `.pill-primary`, `.pill-secondary`): icon plus label, 44 px minimum height.
- **Project cards:** thumbnail, title (the stretched link to the case study), Live and Code links, one sentence, optional verified figure, technology chips with icon. No card inside a card.
- **Chips** (`tech-chip`): single-colour brand icons (`react-icons/si`) in `currentColor`, so the page keeps one accent.
- **Command palette:** `Ctrl+K` / `⌘K`; native modal dialog with a combobox and listbox (see `components/command-palette.tsx`).
- **Forms:** bordered fields, visible labels, inline errors with text (colour is never the only signal).

## Motion

Budget: soft section entrances (CSS and one IntersectionObserver in `components/reveal.tsx`), a 280 ms colour cross-fade on theme change, hover, focus and press states, and the palette opening. All of it is gated on `prefers-reduced-motion: no-preference`. The home does not load GSAP. No parallax, no scroll-linked effects, no entrance animation on the hero (it protects LCP).

## Accessibility

WCAG 2.2 AA. One `h1`, then `h2` per section and `h3` inside. Skip link first. Visible focus (2 px copper outline). Targets of at least 44 px. Verified with axe-core on the home (both languages, both themes, 360 / 768 / 1440 px), case studies, legal pages, the open palette and the open mobile menu.

## Do not

- Add a second accent colour, gradients, glass or glow.
- Advertise skills or tools that are not in the CV and the repositories.
- Hide content behind motion: everything is in the markup and readable without JavaScript.
