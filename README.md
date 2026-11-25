# Rushelle Clement — Portfolio

**Live site:** https://rushelleclement-portfolio.netlify.app/

A single-page, static portfolio for Rushelle Clement, Front-End Developer (Angular · React).
Plain HTML, CSS and JavaScript — no framework, no backend, no database, no build step.

## Structure

```
rushelle-portfolio/
├── index.html                  # All page content and share-preview tags (edit copy here)
├── css/styles.css              # Styles — colours/fonts are CSS variables at the top
├── js/main.js                  # Theme toggle, menu, scroll effects, filters, copy-email
├── README.md
└── assets/
    ├── favicon.svg             # Browser tab icon
    ├── apple-touch-icon.png    # Home-screen icon (iPhone/iPad), 180×180
    ├── og-image.png            # Link preview image for social/chat apps, 1200×630
    ├── cv/
    │   └── Rushelle-Clement-CV.pdf   # Served by every "Download CV" button
    └── projects/               # Put project screenshots here
```

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended, so links behave exactly as in production):

```bash
# Node
npx serve .

# or Python
python -m http.server 8000
```

Then visit http://localhost:3000 (serve) or http://localhost:8000 (Python).

## Deploying updates (Netlify)

The site is hosted on Netlify at `rushelleclement-portfolio.netlify.app`. No build settings are needed.

- **Drag-and-drop deploys:** in the Netlify dashboard open the site → **Deploys** → drag the whole `rushelle-portfolio` folder onto the deploy area. Every change needs a fresh upload.
- **Git deploys (optional):** push this folder to a GitHub repo and link it under **Site configuration → Build & deploy**. Leave the build command empty and set the publish directory to `.` — Netlify then redeploys on every push.

If the site address ever changes (custom domain or a renamed Netlify site), update these in `index.html`:
`<link rel="canonical">`, `og:url`, `og:image` and `twitter:image` — they must be full `https://` URLs.

## Link previews

When the URL is shared on LinkedIn, WhatsApp, Facebook, X/Twitter or Slack, the Open Graph and Twitter tags in `<head>` show a card with the title, description and `assets/og-image.png`.

- Platforms cache previews. After changing the image or text, refresh LinkedIn's cache with the
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and Facebook's with the
  [Sharing Debugger](https://developers.facebook.com/tools/debug/). WhatsApp may keep an old preview for a while.
- To change the image, replace `assets/og-image.png` with another 1200×630 PNG or JPG (keep it under ~1 MB).

## Projects and links

- Work projects (CLAUDMD, CYCLONE RCM, AELIUSCASE — Medcube USA; SHIKSHA, IAESL — RapidM3) intentionally have **no links**.
- **EventInvito** (personal project, marked *In progress*) → https://eventinvito.vercel.app/
- **COIR ISLAND** (personal project built for a client) → https://www.coirisland.lk/
- "Also contributed to": Shinad Immigration, HM Digital Solutions, PrimeHope Organization, CDMC.

### Updating a project card

1. **Screenshot:** each card has an illustrated CSS placeholder. Replace its `<div class="mock …">…</div>` with
   `<img class="project-img" src="assets/projects/<name>.webp" alt="Describe the screen" loading="lazy" width="800" height="500" />`.
   Use WebP/JPG around 1600×1000, compressed.
2. **Links:** add a `<div class="project-links">` block (see the EventInvito card) with real public URLs only.
3. **Filter tab:** set `data-cat` on the `<article>` — `healthcare`, `legal`, `education` or `personal`.
4. **Status badge:** EventInvito shows *In progress*; edit or remove the `<span class="badge">` to change it.

## Features

Dark (default) / light theme toggle remembered per visitor, scroll progress bar, sliding nav indicator, hero code window with 3D tilt, tech marquee, bento-grid About & Skills, scroll-filled experience timeline, filterable project cards, cursor spotlight on cards, copy-email button with toast, back-to-top button.
All motion is turned off for visitors whose device is set to reduce motion.

## Customising the look

Colours, fonts, radius and max width live at the top of `css/styles.css`:
light-theme values in `:root`, dark-theme values under `[data-theme="dark"]`.

- `--accent` — muted lavender used for decoration
- `--accent-solid` — button and active-tab fill (white text stays readable)
- `--accent-text` — accent colour for text, tuned for contrast in each theme
- `--mint` — secondary highlight (status dot, progress bar, timeline)

Fonts (Fraunces, Manrope, JetBrains Mono) load from Google Fonts in `index.html`.

## Optional extras

- **Profile photo:** add `assets/profile.jpg` and place an `<img>` in the hero.
- **Custom domain:** Netlify → Domain management. Then update the URLs listed under *Deploying updates*.
