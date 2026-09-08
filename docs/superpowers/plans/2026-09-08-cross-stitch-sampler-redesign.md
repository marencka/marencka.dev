# Cross-Stitch Sampler Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Windows 98 desktop theme with an heirloom cross-stitch sampler (charted-pattern layout) ahead of the Google Chrome role announcement.

**Architecture:** Static site, three files rewritten in place (`index.html`, `css/stylesheet.css`, `js/script.js`). All section content is static HTML in "hoop" panels toggled via the `hidden` attribute. Pixel-art motifs and the Chrome-dino easter egg are rendered as text sprites (`✕` characters in a `<pre>`) filled in by JS from string maps — stitches literally are the pixels. No frameworks, no build step.

**Tech Stack:** Vanilla HTML/CSS/JS. Google Analytics gtag retained. Local verification via `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-09-08-cross-stitch-sampler-redesign-design.md`

## Global Constraints

- No build system, no dependencies, no test framework — verification is `curl` greps plus browser checks at each task (this repo has no JS test infra; the spec deems manual verification proportionate).
- Palette (exact values, used as CSS custom properties): fabric `#f6f1e7`, panel `#fbf8f1`, brick `#a4494c`, brick-dark `#8c3a3d`, mustard `#c9a227`, moss `#6e7f52`, indigo `#3e5470`, ink `#333`, muted `#4a5568`, wood `#b08d57`, wood-dark `#8a6d43`.
- Copy rules: name banner `ALEXIS DANZ`; role line exactly `senior design engineer · google chrome`; About copy verbatim from the spec's Content section.
- Keep: gtag snippet, `src/AMD2026.pdf` resume link (new tab), contact links (mailto `alexismdanz@gmail.com`, LinkedIn `alexisdanz`, GitHub `marencka`), all three existing projects with their copy.
- Accessibility: nav rows are real `<button>`/`<a>` elements, Escape closes an open hoop, `prefers-reduced-motion` disables pulse/hoop/dino animation.
- Mobile breakpoint: `700px`.

---

### Task 1: Rewrite `index.html` as the sampler

**Files:**
- Modify: `index.html` (full rewrite)

**Interfaces:**
- Produces: elements JS and CSS depend on — `button.key-row[data-panel]`, `button.motif[data-panel]` / `a.motif`, `section.hoop#panel-<name>[hidden]`, `[data-close]` close buttons, `pre.sprite[data-sprite=<heart|spool|envelope|page>]`, `pre#dino[data-sprite=dino][hidden]`. Panel names: `about`, `projects`, `contact`.

- [ ] **Step 1: Replace the entire contents of `index.html` with:**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z09S7BZT6G"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-Z09S7BZT6G');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="css/stylesheet.css" rel="stylesheet">
  <title>Alexis Danz</title>
  <meta name="description"
    content="The cross-stitched personal website of Alexis Danz — Senior Design Engineer at Google working on Chrome, knitter, and sewist.">
  <link rel="icon" type="image/svg+xml" href="img/favicon.svg">
  <script src="js/script.js" defer></script>
</head>

<body>
  <main class="sampler">
    <div class="sampler-frame">

      <header class="banner">
        <h1 class="stitch-name">ALEXIS DANZ</h1>
        <p class="chrome-thread" aria-hidden="true"><span class="t-brick">✕✕✕✕</span><span
            class="t-mustard">✕✕✕✕</span><span class="t-moss">✕✕✕✕</span><span class="t-indigo">✕✕✕✕</span></p>
        <p class="role">senior design engineer · google chrome</p>
      </header>

      <nav class="chart-key" aria-label="Site navigation">
        <h2 class="key-title">Chart Key</h2>
        <button class="key-row" data-panel="about"><span class="sym" aria-hidden="true">✕</span>about</button>
        <button class="key-row" data-panel="projects"><span class="sym" aria-hidden="true">◆</span>projects</button>
        <button class="key-row" data-panel="contact"><span class="sym" aria-hidden="true">○</span>contact</button>
        <a class="key-row" href="src/AMD2026.pdf" target="_blank" rel="noreferrer"><span class="sym"
            aria-hidden="true">■</span>resume</a>
      </nav>

      <div class="motifs">
        <button class="motif" id="motif-about" data-panel="about" aria-label="Open about panel">
          <pre class="sprite" data-sprite="heart" aria-hidden="true"></pre>
        </button>
        <button class="motif" id="motif-projects" data-panel="projects" aria-label="Open projects panel">
          <pre class="sprite" data-sprite="spool" aria-hidden="true"></pre>
        </button>
        <button class="motif" id="motif-contact" data-panel="contact" aria-label="Open contact panel">
          <pre class="sprite" data-sprite="envelope" aria-hidden="true"></pre>
        </button>
        <a class="motif" id="motif-resume" href="src/AMD2026.pdf" target="_blank" rel="noreferrer"
          aria-label="Open resume (PDF, new tab)">
          <pre class="sprite" data-sprite="page" aria-hidden="true"></pre>
        </a>
      </div>

      <section class="hoop" id="panel-about" hidden aria-labelledby="about-title">
        <button class="hoop-close" data-close>✕ close</button>
        <div class="hoop-content">
          <h2 class="hoop-title" id="about-title"><span aria-hidden="true">✕</span> About</h2>
          <p>Hi there! I’m Alexis — a Senior Design Engineer at Google, working on Chrome.</p>
          <p>I’ve always built things stitch by stitch: sweaters from colorwork charts, apps from component systems,
            and once, a whole career. Lately that includes <strong>Himmel</strong>, an iOS app that predicts sunrise
            and sunset quality with ML trained on thousands of my own sky observations.</p>
          <p class="fine">Off hours: subpar cyclist, outdoorist, craft aficionado, foodie, big reader.</p>
        </div>
      </section>

      <section class="hoop" id="panel-projects" hidden aria-labelledby="projects-title">
        <button class="hoop-close" data-close>✕ close</button>
        <div class="hoop-content">
          <h2 class="hoop-title" id="projects-title"><span aria-hidden="true">◆</span> Projects</h2>
          <h3>Himmel</h3>
          <p>Utilizing the Apple WeatherKit and a recurrent neural network to provide a predictive score for that
            day's sunrise or sunset.</p>
          <h3><a
              href="https://play.google.com/store/apps/details?id=appinventor.ai_julielynn_wong.TS_19b_Oct_2021&amp;hl=en_US&amp;gl=US">Thermocoagulator
              Simulator App</a></h3>
          <p>Published android app on the Google Play store that allows health care professionals to train with a
            probe to treat and prevent cervical cancer. Created for a medical coalition to provide resource limited
            hospitals with opportunity to train with the probe prior to purchasing.</p>
          <h3>Notify Me</h3>
          <p>JavaScript program that parsed the North Carolina vaccination appointment website using JSDOM at a set
            interval for health care workers.</p>
        </div>
      </section>

      <section class="hoop" id="panel-contact" hidden aria-labelledby="contact-title">
        <button class="hoop-close" data-close>✕ close</button>
        <div class="hoop-content">
          <h2 class="hoop-title" id="contact-title"><span aria-hidden="true">○</span> Contact</h2>
          <ul class="contact-list">
            <li><span class="sym" aria-hidden="true">✕</span><a href="mailto:alexismdanz@gmail.com">email</a></li>
            <li><span class="sym" aria-hidden="true">◆</span><a href="https://www.linkedin.com/in/alexisdanz/"
                rel="noreferrer" target="_blank">linkedin</a></li>
            <li><span class="sym" aria-hidden="true">○</span><a href="https://github.com/marencka" rel="noreferrer"
                target="_blank">github</a></li>
          </ul>
        </div>
      </section>

      <p class="footer-thread" aria-hidden="true"><span class="t-brick">✕</span><span class="t-mustard">◆</span><span
          class="t-moss">✕</span><span class="t-indigo">◆</span><span class="t-brick">✕</span><span
          class="t-mustard">◆</span><span class="t-moss">✕</span><span class="t-indigo">◆</span><span
          class="t-brick">✕</span><span class="t-mustard">◆</span><span class="t-moss">✕</span><span
          class="t-indigo">◆</span><span class="t-brick">✕</span><span class="t-mustard">◆</span><span
          class="t-moss">✕</span><span class="t-indigo">◆</span></p>

      <pre class="sprite" id="dino" data-sprite="dino" aria-hidden="true" hidden></pre>

    </div>
  </main>
</body>

</html>
```

- [ ] **Step 2: Verify content is present**

Run: `cd /Users/alexisdanz/Desktop/Marencka.dev/marencka.dev && grep -c "hoop" index.html && grep "google chrome" index.html && grep "AMD2026.pdf" index.html && grep -c "Windows" index.html; true`

Expected: hoop count > 0; the role line and both resume links print; `grep -c "Windows"` prints `0` (no Win98 remnants).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html as cross-stitch sampler structure"
```

---

### Task 2: Rewrite `css/stylesheet.css` (desktop styles)

**Files:**
- Modify: `css/stylesheet.css` (full rewrite)

**Interfaces:**
- Consumes: Task 1's class/id names.
- Produces: classes JS toggles — `.motif.pulse` (hover pulse), `#dino.running` (run animation), `[hidden]` respected everywhere. CSS vars `--fabric` etc. for all colors.

- [ ] **Step 1: Replace the entire contents of `css/stylesheet.css` with:**

```css
/* ========== Heirloom sampler theme ========== */
:root {
  --fabric: #f6f1e7;
  --panel: #fbf8f1;
  --brick: #a4494c;
  --brick-dark: #8c3a3d;
  --mustard: #c9a227;
  --moss: #6e7f52;
  --indigo: #3e5470;
  --ink: #333;
  --muted: #4a5568;
  --wood: #b08d57;
  --wood-dark: #8a6d43;
  --mono: "Courier New", Courier, monospace;
  --serif: Georgia, "Times New Roman", serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

[hidden] { display: none !important; }

body {
  background-color: var(--fabric);
  background-image: radial-gradient(circle, rgba(90, 70, 40, 0.13) 1.5px, transparent 1.5px);
  background-size: 10px 10px;
  font-family: var(--mono);
  color: var(--ink);
}

.sampler {
  min-height: 100dvh;
  padding: 16px;
}

.sampler-frame {
  position: relative;
  min-height: calc(100dvh - 32px);
  border: 3px solid var(--brick);
  border-radius: 3px;
  outline: 1px dashed var(--mustard);
  outline-offset: -8px;
  overflow: hidden;
}

/* --- Banner --- */
.banner { text-align: center; padding-top: 40px; }

.stitch-name {
  font-family: var(--mono);
  font-weight: bold;
  font-size: clamp(28px, 5vw, 52px);
  letter-spacing: 0.28em;
  padding-left: 0.28em; /* optically recenter letter-spaced text */
  background-image: repeating-linear-gradient(45deg, var(--brick-dark) 0 2px, var(--brick) 2px 4px);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.chrome-thread { font-size: 15px; letter-spacing: 3px; margin-top: 6px; }

.role { font-size: 14px; letter-spacing: 2px; color: var(--muted); margin-top: 8px; }

.t-brick { color: var(--brick-dark); }
.t-mustard { color: var(--mustard); }
.t-moss { color: var(--moss); }
.t-indigo { color: var(--indigo); }

/* --- Chart key --- */
.chart-key {
  position: absolute;
  left: 5%;
  top: 38%;
  background: rgba(251, 248, 241, 0.94);
  border: 1px solid var(--indigo);
  box-shadow: 3px 3px 0 rgba(62, 84, 112, 0.15);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.key-title {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--indigo);
  border-bottom: 1px dashed var(--indigo);
  padding-bottom: 6px;
  margin-bottom: 8px;
}

.key-row {
  font-family: var(--mono);
  font-size: 15px;
  letter-spacing: 1px;
  color: var(--indigo);
  background: none;
  border: none;
  text-decoration: none;
  text-align: left;
  padding: 5px 2px;
  cursor: pointer;
}

.key-row .sym { display: inline-block; width: 1.6em; color: var(--brick); }

.key-row:hover, .key-row:focus-visible { color: var(--brick-dark); font-weight: bold; }

.key-row:focus-visible { outline: 2px dashed var(--brick); outline-offset: 2px; }

/* --- Motifs (text-stitch sprites) --- */
.sprite {
  font-family: var(--mono);
  font-size: 9px;
  line-height: 1.15;
  letter-spacing: 1px;
  user-select: none;
}

.motif {
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--indigo);
  padding: 6px;
}

.motif:hover .sprite, .motif:focus-visible .sprite, .motif.pulse .sprite {
  color: var(--brick-dark);
  animation: stitch-pulse 0.6s ease-in-out infinite alternate;
}

.motif:focus-visible { outline: 2px dashed var(--brick); outline-offset: 2px; }

@keyframes stitch-pulse {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}

#motif-about { left: 48%; top: 40%; color: var(--brick); }
#motif-projects { left: 66%; top: 55%; color: var(--moss); }
#motif-contact { left: 50%; top: 70%; color: var(--indigo); }
#motif-resume { left: 78%; top: 36%; color: var(--mustard); }

/* --- Hoop panels --- */
.hoop {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(600px, 92vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--panel);
  border: 7px solid var(--wood);
  box-shadow: 0 0 0 3px var(--wood-dark), 4px 6px 14px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.hoop-content {
  position: absolute;
  inset: 12%;
  overflow-y: auto;
  font-family: var(--serif);
  font-size: 15px;
  line-height: 1.6;
  text-align: center;
}

.hoop-content h3 { font-family: var(--mono); letter-spacing: 1px; color: var(--indigo); margin-top: 14px; }

.hoop-content p { margin-top: 8px; }

.hoop-content a { color: var(--brick-dark); }

.hoop-title {
  font-family: var(--mono);
  font-size: 18px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--brick-dark);
  margin-bottom: 10px;
}

.hoop-close {
  position: absolute;
  top: 13%;
  right: 16%;
  z-index: 11;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--brick);
  background: none;
  border: none;
  cursor: pointer;
}

.hoop-close:hover, .hoop-close:focus-visible { font-weight: bold; color: var(--brick-dark); }

.fine { font-size: 13px; color: var(--muted); }

.contact-list { list-style: none; margin-top: 10px; }

.contact-list li { padding: 8px 0; font-family: var(--mono); font-size: 16px; letter-spacing: 1px; }

.contact-list .sym { color: var(--brick); margin-right: 10px; }

/* --- Footer thread + dino --- */
.footer-thread {
  position: absolute;
  bottom: 14px;
  width: 100%;
  text-align: center;
  font-size: 13px;
  letter-spacing: 4px;
}

#dino {
  position: absolute;
  bottom: 34px;
  left: -90px;
  color: var(--moss);
  z-index: 5;
}

#dino.running { animation: dino-run 7s linear forwards, dino-hop 0.4s ease-in-out infinite alternate; }

@keyframes dino-run {
  from { left: -90px; }
  to { left: 100%; }
}

@keyframes dino-hop {
  from { bottom: 34px; }
  to { bottom: 46px; }
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  .motif:hover .sprite, .motif:focus-visible .sprite, .motif.pulse .sprite,
  #dino.running { animation: none; }
}
```

- [ ] **Step 2: Verify in browser**

Run: `cd /Users/alexisdanz/Desktop/Marencka.dev/marencka.dev && python3 -m http.server 8123` (background) then open `http://localhost:8123`.

Expected: cream dotted fabric, stitched red frame with dashed mustard inner line, gradient-textured `ALEXIS DANZ` banner with four-color × row, chart key box on the left. Motifs are empty (sprites fill in Task 3) — that's expected. No hoop visible (all `hidden`).

- [ ] **Step 3: Commit**

```bash
git add css/stylesheet.css
git commit -m "feat: heirloom sampler stylesheet"
```

---

### Task 3: Rewrite `js/script.js` — sprites, hoops, nav, easter egg

**Files:**
- Modify: `js/script.js` (full rewrite)

**Interfaces:**
- Consumes: Task 1 DOM (`[data-sprite]`, `[data-panel]`, `[data-close]`, `#panel-*`, `#motif-*`, `#dino`); Task 2 classes (`.pulse`, `.running`).
- Produces: nothing consumed later; self-contained.

- [ ] **Step 1: Replace the entire contents of `js/script.js` with:**

```javascript
/* Text-stitch sprites: 'x' = one stitch (rendered as ✕), '.' = bare fabric */
var SPRITES = {
  heart: [
    '.xx.xx.',
    'xxxxxxx',
    'xxxxxxx',
    '.xxxxx.',
    '..xxx..',
    '...x...'
  ],
  spool: [
    'xxxxxxx',
    '.x...x.',
    '.xxxxx.',
    '.xxxxx.',
    '.xxxxx.',
    '.x...x.',
    'xxxxxxx'
  ],
  envelope: [
    'xxxxxxxx',
    'xx....xx',
    'x.x..x.x',
    'x..xx..x',
    'x......x',
    'xxxxxxxx'
  ],
  page: [
    'xxxxx.',
    'x...xx',
    'x....x',
    'x.xx.x',
    'x....x',
    'x.xx.x',
    'xxxxxx'
  ],
  dino: [
    '......xxxx',
    '......x.xx',
    '......xxxx',
    '......xx..',
    '.x...xxxx.',
    '.x..xxxxx.',
    '.xx.xxxx..',
    '..xxxxxx..',
    '...xxxx...',
    '...x..x...'
  ]
};

function renderSprites() {
  document.querySelectorAll('[data-sprite]').forEach(function (el) {
    var map = SPRITES[el.getAttribute('data-sprite')];
    if (map) {
      el.textContent = map.join('\n').replace(/x/g, '✕').replace(/\./g, ' ');
    }
  });
}

/* Hoop panels: one open at a time */
function openHoop(name) {
  closeHoop();
  var panel = document.getElementById('panel-' + name);
  if (panel) {
    panel.hidden = false;
    var closeBtn = panel.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();
  }
}

function closeHoop() {
  document.querySelectorAll('.hoop').forEach(function (p) { p.hidden = true; });
}

function wireNav() {
  document.querySelectorAll('[data-panel]').forEach(function (el) {
    el.addEventListener('click', function () {
      openHoop(el.getAttribute('data-panel'));
    });
  });

  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', closeHoop);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeHoop();
  });

  /* Hovering a chart-key row pulses its motif */
  document.querySelectorAll('.key-row[data-panel]').forEach(function (row) {
    var motif = document.getElementById('motif-' + row.getAttribute('data-panel'));
    if (!motif) return;
    row.addEventListener('mouseenter', function () { motif.classList.add('pulse'); });
    row.addEventListener('mouseleave', function () { motif.classList.remove('pulse'); });
  });
}

/* Easter egg: Konami code sends a cross-stitched dino across the bottom border */
var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var konamiProgress = 0;

function runDino() {
  var dino = document.getElementById('dino');
  if (!dino.hidden) return; /* already running */
  dino.hidden = false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(function () { dino.hidden = true; }, 4000);
    return;
  }

  dino.classList.add('running');
  dino.addEventListener('animationend', function onEnd(e) {
    if (e.animationName === 'dino-run') {
      dino.classList.remove('running');
      dino.hidden = true;
      dino.removeEventListener('animationend', onEnd);
    }
  });
}

document.addEventListener('keydown', function (e) {
  var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === KONAMI[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === KONAMI.length) {
      konamiProgress = 0;
      runDino();
    }
  } else {
    konamiProgress = key === KONAMI[0] ? 1 : 0;
  }
});

/* Init (script is loaded with defer, so the DOM is ready) */
renderSprites();
wireNav();
```

- [ ] **Step 2: Verify in browser**

With the Task 2 server still running, reload `http://localhost:8123` and check:
- All four motifs render as ✕-stitched pictures (heart, spool, envelope, page).
- Clicking `about` in the chart key opens the About hoop; clicking `◆ projects` swaps to Projects; `✕ close` and Escape both close it.
- Hovering a chart-key row pulses its motif.
- Konami code (↑↑↓↓←→←→ b a) sends the green stitched dino hopping across the bottom, once, then it disappears.
- `resume` (key row and page motif) opens `src/AMD2026.pdf` in a new tab.

- [ ] **Step 3: Commit**

```bash
git add js/script.js
git commit -m "feat: sampler interactions — stitch sprites, hoop panels, Konami dino"
```

---

### Task 4: Mobile styles

**Files:**
- Modify: `css/stylesheet.css` (append to end)

**Interfaces:**
- Consumes: Task 2 selectors.

- [ ] **Step 1: Append to `css/stylesheet.css`:**

```css
/* --- Mobile: chart key becomes the nav, hoops become cards --- */
@media (max-width: 700px) {
  .motifs { display: none; }

  .chart-key {
    position: static;
    margin: 40px auto 0;
    width: max-content;
  }

  .sampler-frame { min-height: calc(100dvh - 32px); padding-bottom: 60px; }

  .hoop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw - 32px);
    max-height: 80dvh;
    aspect-ratio: auto;
    border-radius: 22px;
  }

  .hoop-content {
    position: static;
    inset: auto;
    max-height: calc(80dvh - 80px);
    padding: 52px 22px 24px;
  }

  .hoop-close { top: 18px; right: 20px; }
}
```

- [ ] **Step 2: Verify at mobile width**

In the browser, narrow the window below 700px (or use devtools device mode). Expected: motifs gone, chart key centered under the banner, opening `projects` shows a full-width rounded card whose content scrolls; close button visible in the card's top-right corner.

- [ ] **Step 3: Commit**

```bash
git add css/stylesheet.css
git commit -m "feat: mobile layout — chart-key nav and card hoops"
```

---

### Task 5: Favicon, asset cleanup, README

**Files:**
- Create: `img/favicon.svg`
- Delete: all Win98-era files in `img/` (everything except the new `favicon.svg`)
- Modify: `README.md` (site description lines)

**Interfaces:**
- Consumes: Task 1's `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`.

- [ ] **Step 1: Create `img/favicon.svg`:**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="#f6f1e7"/>
  <path d="M3 3 L13 13 M13 3 L3 13" stroke="#a4494c" stroke-width="2.6" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 2: Remove all old assets**

```bash
git rm img/*.png img/*.PNG img/*.jpg img/*.cur img/*.ico "img/Microsoft Offer.pdf"
git add img/favicon.svg
```

Then confirm nothing referenced is missing: `grep -o 'img/[A-Za-z0-9._ -]*' index.html css/stylesheet.css | sort -u` — expected output is only `img/favicon.svg`.

Note: `Microsoft Offer.pdf` and old images remain in git history; scrubbing history is out of scope (flag to Alexis in the final report).

- [ ] **Step 3: Update `README.md`** — replace any sentence describing the site as Windows 98 themed with: "A cross-stitch sampler themed personal website — needlework as the original pixel art." Keep the site history paragraphs; the Win98 era is part of the story, just past tense.

- [ ] **Step 4: Verify and commit**

Reload the site; the tab shows the stitched × favicon and no 404s in the network tab.

```bash
git add README.md
git commit -m "chore: stitched favicon, remove Win98 assets, update README"
```

---

### Task 6: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full checklist at `http://localhost:8123`**

- Desktop: banner, chart key, four motifs, footer thread all render; every key row and motif works; one hoop at a time; Escape closes; hover pulse works.
- Mobile width: nav usable, hoops scroll, nothing overflows horizontally.
- Konami dino runs exactly once per entry and can be re-triggered after it exits.
- All external links work: Play Store, LinkedIn, GitHub, mailto, resume PDF.
- `grep -ri "windows\|microsoft\|clippy\|bsod" index.html js/script.js css/stylesheet.css` returns nothing.
- View source: meta description is the new one; title `Alexis Danz`.

- [ ] **Step 2: Stop the local server; report results honestly** (any check that fails goes back to its task before this one is marked complete).
```

## Self-Review

- **Spec coverage:** visual language (T2), structure/nav/interactions (T1+T3), content incl. approved copy (T1), easter egg (T3), mobile (T4), meta/favicon/cleanup (T5), testing (per-task + T6). Reduced-motion covered in T2 CSS + T3 dino guard. No gaps.
- **Placeholder scan:** none — all file contents are complete and verbatim.
- **Type consistency:** panel names (`about`/`projects`/`contact`) match across `data-panel`, `#panel-*`, and `#motif-*`; class names `.pulse`/`.running` match between T2 CSS and T3 JS; `data-sprite` keys match the `SPRITES` object.
