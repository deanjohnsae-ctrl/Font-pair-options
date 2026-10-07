# Font Pair Options — Deccan Herald & Prajavani story page

A responsive replica of the Deccan Herald (English) and Prajavani (Kannada) **story page**, built to evaluate heading + body **font pairings** in a realistic reading context.

**Live:** https://deanjohnsae-ctrl.github.io/Font-pair-options/

## Features

- **DH ↔ PV site toggle** — same semantic story page; switches language, navigation, accent colour and default brand fonts.
- **Font-pair switcher** (floating panel, bottom-right):
  - **Current · Brand** — DH: Playfair Display + Roboto Slab · PV: Prajavani Text (default).
  - **Free · Google Fonts** — 9 pairs, each defining DH (Latin) and PV (Kannada) heading/body.
  - **Paid · Licensed** — 6 pairs (Typotheque, Indian Type Foundry, Ek Type). These commercial fonts are not bundled, so they preview with a fallback and each links out to the foundry's own type-tester. Drop licensed `.woff2` files into `paid-fonts/` (see `paid-fonts/README.txt`) to render them in-page.
- **Mobile-friendly** — the font selector collapses on small screens and shows the active pair.

## Fonts render on every device (no local install needed)

- All free pairs load as **webfonts from Google Fonts** (CDN).
- The Prajavani brand font is **self-hosted** from `fonts/` via `@font-face`, so it ships with the site.
- Nothing depends on the viewer having fonts installed. The only exception is the 6 paid pairs (licensing) — those are preview-via-foundry-link by design.

## Run locally

Any static server works, e.g. `npx serve` in this folder, then open the printed URL.

## Deployment (GitHub Pages)

Served as a static site from the repository root. One-time setup:
**Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / `/ (root)` → Save.**
GitHub publishes to https://deanjohnsae-ctrl.github.io/Font-pair-options/ within ~1 minute; every push to `main` redeploys automatically. A `.nojekyll` file makes Pages serve all files verbatim.
