# Rushelle Clement — Portfolio

A single-page, static portfolio. Plain HTML, CSS and JavaScript — no framework, no backend, no database, no build step.

## Structure

```
rushelle-portfolio/
├── index.html          # All page content (edit copy here)
├── css/styles.css      # Styles — colours/fonts are CSS variables at the top
├── js/main.js          # Mobile menu, scroll reveals, active nav link
└── assets/
    ├── favicon.svg
    ├── cv/             # Put Rushelle-Clement-CV.pdf here
    └── projects/       # Put project screenshots here
```

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended, so relative links behave exactly as in production):

```bash
# Node
npx serve .

# or Python
python -m http.server 8000
```

Then visit http://localhost:3000 (serve) or http://localhost:8000 (Python).

## Deploy

Any static host works. Drag-and-drop the folder into Netlify, or connect the repo to Vercel / Render / GitHub Pages with no build command and `.` as the publish directory.

## Before publishing

1. **CV** — add `assets/cv/Rushelle-Clement-CV.pdf` (both "Download CV" buttons point here).
2. **Screenshots** — in `index.html`, each project card has an illustrated CSS placeholder. Replace its
   `<div class="mock …">…</div>` with
   `<img class="project-media" src="assets/projects/<name>.webp" alt="Describe the screen" loading="lazy" width="800" height="500" />`.
   Use WebP/JPG around 1600×1000, compressed.
3. **Project links** — uncomment the `project-links` block in a card and add real public URLs only.
4. **Profile photo (optional)** — see the comment inside the hero "At a glance" card.
5. **EventInvito** — currently shown as *In progress*; update the badge and description when confirmed.
6. **Other projects** — confirm Shinad Immigration, HM Digital Solutions, PrimeHope Organization and CDMC are fine to show publicly; remove any that aren't.
7. **Links** — work projects (Medcube, RapidM3) intentionally have no links. EventInvito links to https://eventinvito.vercel.app/ and COIR ISLAND to https://www.coirisland.lk/.

## Features

Dark (default) / light theme toggle (remembered per visitor), scroll progress bar, sliding nav indicator, hero code window with 3D tilt, tech marquee, bento-grid About & Skills, scroll-filled experience timeline, filterable project cards, cursor spotlight on cards, copy-email button with toast, back-to-top button. All motion is disabled for visitors who prefer reduced motion.

To add a project to a filter tab, set `data-cat` on its `<article>` (`healthcare`, `legal`, `education`, `personal`).

## Customising the look

Colours, fonts, radius and max width live in `:root` at the top of `css/styles.css`. `--accent` is the violet used for decoration, `--accent-solid` fills buttons, `--accent-text` is the accent for text (tuned for contrast in each theme), and `--mint` is the secondary highlight. Light-theme values are in `:root`; dark-theme values are under `[data-theme="dark"]`.
