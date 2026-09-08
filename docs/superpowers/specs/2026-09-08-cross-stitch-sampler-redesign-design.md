# Cross-Stitch Sampler Redesign — Design Spec

**Date:** 2026-09-08
**Status:** Approved (visual direction, layout, and intro copy validated via visual companion mockups)

## Context

Alexis is leaving Microsoft for a Senior Design Engineer role at Google, working on Chrome. The current site is a Windows 98 desktop simulation — an employer in-joke that expires with the job change, and retro-OS themes have become commonplace anyway. The redesign must ship before the LinkedIn announcement drives traffic to the site.

## Thesis

**Needlework is the original pixel art.** Cross-stitch charts are grids of discrete cells — literally pixels in thread. The new theme is anchored in Alexis's permanent identity (sewing, knitting, design engineering), not her employer. Google/Chrome appears only as flavor that won't expire: a border row stitched in muted Chrome colors, and a Chrome-dino easter egg.

## Visual language ("Heirloom linen")

- **Fabric:** warm cream aida cloth `#f6f1e7`, woven-hole texture via a subtle dot grid (CSS `radial-gradient`, ~10px cell).
- **Floss palette (doubles as muted Chrome red/yellow/green/blue):**
  - Brick red `#a4494c` (dark `#8c3a3d`) — primary accent, headings
  - Mustard `#c9a227`
  - Moss `#6e7f52`
  - Indigo `#3e5470` — secondary text, chart key
  - Panel ground `#fbf8f1`, body text `#333`, muted text `#4a5568`
  - Hoop wood tones `#b08d57` / `#8a6d43`
- **Typography:** stitched/pixel-flavored monospace (Courier New stack or a pixel webfont if one fits the stitch aesthetic) with letter-spacing for the name banner, headings, chart key, and UI chrome; Georgia serif for body copy inside hoops. Sampler outside, book inside.
- **Sampler border:** stitched frame around the viewport — solid brick border with an inner dashed mustard line (outline-offset), plus decorative × border rows.

## Structure: single-viewport "charted pattern" sampler

No page scrolling on desktop; the viewport is one sampler (same spirit as the old desktop metaphor).

1. **Name banner** (top center): `ALEXIS DANZ` in stitched caps; beneath it a border row of ×s in the four Chrome colors (heritage tones); subtitle `senior design engineer · google chrome`.
2. **Chart key** (left side): a legend box titled `CHART KEY` with rows `✕ about`, `◆ projects`, `○ contact`, `■ resume`. This is the primary nav.
3. **Motifs** stitched across the fabric (e.g., yarn/needle for about, thread spool for projects, envelope for contact, scroll for resume) as secondary nav targets.
4. **Hoop panels:** clicking a chart-key row **or** its motif opens that section in a circular embroidery-hoop panel (double wood-tone ring). One hoop open at a time; opening another closes the current one.
5. **Footer border row** of alternating colored stitches along the bottom — also the dino's runway.

### Interactions

- Hovering a chart-key row makes its motif pulse (a brief "stitch pulse" scale/glow). Both nav paths are fully clickable, so nothing depends on decoding the legend metaphor.
- Hoop open/close uses a quick unravel/re-stitch animation.
- Keyboard: chart-key rows are real buttons, focus-visible styles, Escape closes an open hoop.
- `prefers-reduced-motion`: disable pulse, unravel, and dino animations.

## Content

- **About:** rewritten intro (approved copy): "Hi there! I'm Alexis — a Senior Design Engineer at Google, working on Chrome. I've always built things stitch by stitch: sweaters from colorwork charts, apps from component systems, and once, a whole career. Lately that includes **Himmel**, an iOS app that predicts sunrise and sunset quality with ML trained on thousands of my own sky observations." Plus the off-hours line: "subpar cyclist, outdoorist, craft aficionado, foodie, big reader."
- **Projects:** existing project content carried over unchanged (restyled only).
- **Contact:** existing links (email, GitHub, LinkedIn) carried over.
- **Resume:** opens `src/AMD2026.pdf` (current resume) in a new tab.
- **Meta:** update `<meta name="description">` (currently says "Windows 98 themed") and page title if needed; new favicon — a stitched × in brick red on cream.
- Keep the existing Google Analytics gtag snippet.

## Easter egg

Konami code (↑↑↓↓←→←→BA) triggers a **cross-stitched Chrome dino** that hops along the bottom border row and exits. Rendered in the stitch aesthetic (pixel sprite with ×-texture), not Google's actual artwork. Replaces the old Konami BSOD.

## Mobile (< ~700px)

- Motifs are hidden; the chart key becomes the whole nav, centered under the name banner.
- Hoops render as full-width rounded panels instead of circles (circular hoops don't fit narrow screens).
- Page may scroll naturally if a panel's content exceeds the viewport.

## Implementation shape

Rewrite in place — same three files, no build system, no frameworks:

- `index.html` — new structure (banner, chart key, motifs, hoop panels, dino element).
- `css/stylesheet.css` — full rewrite; CSS custom properties for the palette.
- `js/script.js` — hoop open/close, hover-pulse wiring, Konami listener + dino animation. Keep it small and dependency-free like today.
- **Asset cleanup:** `git rm` Win98-era images no longer referenced (Clippy, desktop icons, `Microsoft Offer.pdf`, etc.); add new favicon and any motif/dino sprites (prefer inline SVG/CSS over image files where practical).

## Error handling & robustness

- All section content lives statically in the HTML (hoop panels are `display`-toggled, not JS-injected), so crawlers and reader modes see everything. Opening panels requires JS, same as the current site — an accepted trade-off for a personal site.
- No external requests beyond gtag and the resume PDF; nothing to time out.

## Testing

- Manual visual verification via a local static server at desktop and mobile widths (hoop open/close, both nav paths, hover pulse, Escape, reduced-motion).
- Verify the Konami sequence triggers the dino exactly once per entry.
- Verify resume PDF link, contact links, favicon, and updated meta description.
- No JS test infra exists in this repo and the logic is ~100 lines of DOM wiring; manual verification is proportionate.

## Out of scope

- Projects content changes, blog, dark mode, colorway switcher, CMS — YAGNI.
