# Site Refactor + Konami BSOD Easter Egg — Design

Date: 2026-09-08
Status: Approved

## Goal

Clean up `index.html`, `css/stylesheet.css`, and `js/script.js` — removing redundancy and
dead code — while keeping the Windows 98 look pixel-equivalent. Add a hidden easter egg:
the Konami code triggers a classic Blue Screen of Death.

## Decisions (approved by Alexis)

1. **Dead code:** remove everything unreachable — the Tailwind login dialog (its Login
   button calls a nonexistent `checkPassword()`), plus orphaned `.update-content`,
   `.loading-content`, `.job-content`, `.tailwind` CSS, the `loader` keyframes, the
   Merriweather/PT Mono font import, and unused JS (`closeJob`, `closeUpdate`,
   `openLoading`, `isMobileUser`, `setDisplayNoneOnMobile`).
2. **Easter egg:** Konami code (↑↑↓↓←→←→BA) shows a full-screen Win98-style BSOD built
   with CSS + the existing `claconneu` font. Any key or click dismisses it. Keyboard-only,
   so effectively desktop-only.
3. **Refactor approach:** shared component classes.

## Design

### HTML

Every window uses shared chrome: `.window` (bevel frame), `.window-header` (title bar +
`.window-buttons`), `.window-menu` (File/Edit/View row), `.window-separator`,
`.window-body`, `.window-footer`. Windows get ids `intro`, `aboutme`, `contact`,
`credits`, `terminal` and a same-named modifier class for size/position. Desktop icons
become `.desktop-icon` inside `.desktop-icons`; start-menu entries become
`.startmenu-item`. Fixes: stray `</a>`, `<div>`-in-`<p>` nesting, duplicated `onclick`s
(one per clickable element), `input type=image` converted to `img`, inline drag script
moved into `script.js` (loaded with `defer`).

### CSS

One definition per chrome piece replaces six near-identical copies, in both desktop and
mobile blocks. Per-window rules hold only geometry/content styling. New variables:
`--navy` (#0808a9), `--cream` (#ffffe1). Dead selectors and `-webkit-` keyframe
duplicates removed. Dead-by-typo rules (`.partition2` vs HTML `partion2`,
`.intro-button img`) removed rather than activated. Target: ~2,900 → under ~1,000 lines,
no visual change.

### JS

`openWindow(id)` / `closeWindow(id)` / `toggleWindow(id)` replace the nine per-window
functions. `updateTime` gains zero-padded minutes. Drag logic finds the header via
`querySelector('.window-header')`. Konami listener tracks progress through the sequence;
on completion shows `#bsod` (display: flex); next keydown or click hides it.

### Testing

Serve locally, click through every window, drag, start menu, clock, mobile width, and
the easter egg. Verify no console errors and no references to removed classes/functions.
