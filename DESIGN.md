---
name: Alex Vicente Portfolio: Framed Column
description: A dark-first, single-column professional profile with a photographic cover, numbered chapters and one copper accent
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
    primary: "#8f4a24"
    on-primary: "#ffffff"
    destructive: "#b3261e"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 5.3vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.05em"
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
  column: "56rem"
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

**Creative direction.** A single centered column (896 px) framed by thin vertical rules on wide screens and edge to edge on phones. The home reads like a personal profile and a portfolio of work: a photograph and portrait introduce Alex, numbered chapters tell the story, and each featured project explains what it does before listing its stack.

**Direction explored.** The profile format gives both the person and the work room. Shubham and Paras informed the cover-and-portrait composition. Prathm and Anuzx informed the compact professional history.

**Cover source.** `public/portfolio-cover.webp` is an optimized crop of Alex Vicente’s photograph from the raw.vives archive (`alexgallery/public/photos/raw/53.webp`). The credit links to the published archive. The profile portrait has its own alternative text.

**Themes.** Dark is the default and the no-JavaScript state. Light is chosen with the header toggle and stored in `localStorage` (`theme`); an inline head script applies it before first paint. Tokens switch on `[data-theme]` in `app/globals.css`.

**One accent.** Copper: `#e0956a` on dark, `#8f4a24` on light. All text pairs meet WCAG AA (measured: foreground 15.8:1 and 16.0:1, muted 6.6:1 and 6.3:1, primary on background 8.0:1 and 6.0:1, on-primary 8.0:1 and 6.6:1). Input borders are at least 3:1 against their surface.

## Typography

Hanken Grotesk for headings and reading, JetBrains Mono for the wordmark, section strips, dates and metadata. Both are self-hosted through `next/font` with `display: swap`. No serif.

## Layout

- `.site-column` holds header content, main and footer at `--column-width`.
- `.section-strip` (number and heading) and `.section-body` (padding `--column-pad`) make up every numbered section; `Section` in `components/section.tsx` is the only way to add one.
- Section ids are stable anchors used by redirects and the command palette: `about`, `experience`, `projects`, `skills`, `education`, `contact`. The `other` anchor targets the secondary project list inside Projects.
- Header: wordmark `aleviclop.dev`, links from 768 px (a modal menu below), palette button from 480 px, theme toggle and ES/EN switch.

## Components

- **Pills** (`.pill`, `.pill-primary`, `.pill-secondary`): icon plus label, 44 px minimum height.
- **Featured project rows:** thumbnail, category, title, a short account of what the project does, optional verified evidence, technology chips, and direct links to the demo when available and source code. Thumbnail and text sit side by side from 640 px and stack below.
- **Secondary projects:** use the same card layout inside a native disclosure under the featured work. The control works with a keyboard and without JavaScript.
- **Chips** (`tech-chip`): single-colour brand icons (`react-icons/si`) in `currentColor`, so the page keeps one accent.
- **Command palette:** `Ctrl+K` / `⌘K`; native modal dialog with a combobox and listbox (see `components/command-palette.tsx`).
- **Forms:** bordered fields, visible labels, inline errors with text (colour is never the only signal).

## Motion

Budget: soft section entrances (CSS and one IntersectionObserver in `components/reveal.tsx`), a 280 ms colour cross-fade on theme change, hover, focus and press states, and the palette opening. All of it is gated on `prefers-reduced-motion: no-preference`.

## Accessibility

WCAG 2.2 AA target. One `h1`, then `h2` per section and `h3` inside. Skip link first. Visible focus (2 px copper outline). Targets of at least 44 px. During the redesign, the home was checked in Chromium in both languages and themes at 375, 390, 768, 1440 and 1920 px. The current browser suite exercises the public project, language and CV flow on desktop and mobile.

## Do not

- Add a second accent colour, gradients, glass or glow.
- Advertise skills or tools that are not in the CV and the repositories.
- Hide content behind motion: everything is in the markup and readable without JavaScript.
