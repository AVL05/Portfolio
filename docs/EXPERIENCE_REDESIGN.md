# Experience redesign

Requested on 23 October 2026: rebuild the visual composition and interactions,
while preserving professional copy in Spanish and English.

## Interaction contracts

- Hero sculpture responds only to a desktop fine pointer: maximum 14 px X,
  10 px Y and 4 degrees rotation. It resets on pointer leave and when reduced
  motion is enabled. No React state or permanent animation loop drives it.
- Project scenes stack with native CSS sticky only on desktop with a fine
  pointer and no reduced motion. Touch and reduced motion use document flow.
- Full navigation uses the existing native dialog, focus restoration, Escape
  handling and body scroll lock. The no-JavaScript navigation remains available.
- Copy, route pairs, project destinations, CV, contact API and metadata remain.
- Existing project screenshots and photographs are preserved.

## Decorative artwork

Final asset: `public/experience/chrome-form.webp` (1000 x 1000, alpha, 129504 bytes).
Generated with the built-in image tool. The PNG source remains outside the repo.
The WebP is a format/size optimization of that output, preserving alpha.
It is decorative (`alt=""`, hidden from the accessibility tree).

Generation prompt:

> Create a premium abstract 3D sculpture for a creative frontend developer portfolio hero. One single sculptural continuous folded ribbon forming an impossible fluid architectural loop, a subtle A/V-like twist but not a readable letter or logo. Polished liquid chrome, realistic silver specular highlights, black reflections, small restrained acid-lime reflections (#d4ff67) on one edge only. Beautiful asymmetric angular silhouette, substantial thickness, precise folded planes mixed with flowing organic curves. Three-quarter studio view, centered, occupies 80% of a square composition. Photorealistic CGI product render, high-end art direction, sharp tactile detail. Transparent background, true alpha cutout. No floor, no backdrop, no typography, no text, no watermark, no extra objects, no glows, no particles. Must look like a sophisticated physical art object, not a loading spinner, torus donut, chain link, or infinity symbol.

## Verification

Validation ran locally with Node 22.22.2 and pnpm 10.34.1:

- Lint, TypeScript, 48 Node tests, production build and diff whitespace check passed.
- Full Playwright run against the production build: 104 passed, 18 skipped.
- After the final photography focus-color adjustment, production build passed
  again and all 28 tests in `frontend-redesign.spec.ts` passed against that build.
- The final route matrix covers home, three case studies and legal in both
  languages at 1440 x 900 and 390 x 844, plus localized recovery pages.
- Pointer bounds, live reduced-motion reset, sticky fallback and menu focus
  restoration have dedicated browser checks.

No deployment, commit or push. No live email was sent. The optional cross-engine
accessibility/performance audit matrix was not run; no Safari/Firefox or field
performance claim is made.

## Professional studio refinement

The user chose: digital studio, with visual impact and real work leading.

- Typography has more breathing room; the mobile headline and sculpture occupy
  separate areas instead of using an outline to remain legible.
- The selected-work index previews real project interfaces and links to each
  full scene with native, locale-independent fragment identifiers.
- Case actions have a visible primary state, while repository and live-site
  links remain available. The light project surface defines its own button ink.
- Case-study screenshots use more horizontal space with a shallower frame.
- Contact DOM order now matches the visual order: direct links, then form.
- Professional copy and catalog data remain unchanged.

The mechanical Impeccable detector ran once: 70 advisory findings, no higher
severity. These concern the historical design metadata, documented local palette
and type decisions, and an existing unused grid style. The scan is not an
accessibility or performance certification. PRODUCT.md and legacy design metadata
were not migrated as part of this refinement.

Professional refinement final verification (Node 22.22.2): lint, TypeScript,
48 Node tests, production build and whitespace checks passed. Full Playwright
run against the production build: 110 passed, 18 skipped. This includes the
new visual-index destinations and contact reading/keyboard-order checks.
Desktop (1440 x 900) and mobile (390 x 844) screenshots were inspected.
No public deployment, commit, push or real contact submission was performed.
