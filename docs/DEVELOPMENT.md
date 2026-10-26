# Development guide

## Source layout

| Path | Responsibility |
| --- | --- |
| `src/main.jsx` | React entry point and ordered CSS imports (`index.css`, then `anime.css`) |
| `src/App.jsx` | Routes, lazy pages, and Vercel measurement components |
| `src/components/Layout.jsx` | The shell: header, navigation, footer, keyboard shortcuts, smooth scroll, overlays |
| `src/components/RouteTransition.jsx` | The channel-switch transition between pages |
| `src/components/AnimatedPage.jsx` | Scroll reveals, parallax, image clips and counters for a page (`data-*` attributes) |
| `src/components/luxe/` | Themed pieces: hero 3D tape (`HeroCore`), `VhsTape`, `Preloader`, `TitleCard`, `ProjectCard`, `Loadout`, `Monologue` |
| `src/luxe/` | Motion plumbing: GSAP registration and the stage-ready gate (`gsap.js`), Lenis, presence and glider hooks |
| `src/pages/` | Home, Work (`Archive`), Experience (`Timeline`), Contact (`Network`), Overview, and the 404 page |
| `src/content/` | All editable copy and data (see below) |
| `src/anime.css` | The design system: tokens on `:root`, then components, then dated passes that refine them |
| `public/` | Portrait, Open Graph images, sitemap and robots file |
| `scripts/prerender-routes.mjs` | Writes per-route HTML with titles and Open Graph tags after the Vite build |
| `scripts/og-template.mjs` | The 1200×630 card used for each page's Open Graph image |
| `scripts/smoke-render.mjs` | Render and content consistency checks |
| `docs/images/` | Desktop, work and mobile screenshots used in the README |

Stylesheets load in the order declared in `src/main.jsx`, and later rules in `anime.css` override earlier ones. Search for a selector before adding a rule, so you extend the last definition rather than fighting it.

## Update content

| File | What it holds |
| --- | --- |
| `profile.js` | Name, positioning, role, tagline, location, GitHub and LinkedIn links |
| `projects.js` | Projects: code, type, status, summary, tags, repository link |
| `projectScenes.js` | Exactly three architecture stages per project code |
| `experience.js` | Roles and their highlights |
| `capabilities.js` | The three capability cores and the loadout slots |
| `credentials.js` | Google Skills badges and the public profile link |
| `episodes.js` | Each page's episode number, kanji, title and subtitle; `statusTone()` for status colours |
| `monologue.js` | The four question-and-answer lines on Home |
| `seo.js` | Per-page titles, descriptions and Open Graph image names |

### Projects

1. Add or update a project in `src/content/projects.js`.
2. Keep every `code` unique and stable: it identifies the project in URLs such as `/archive?project=AEGIS`.
3. Add exactly three stages in `src/content/projectScenes.js` under the same code.
4. Describe implemented scope separately from planned work, with a status that matches the repository.
5. Run `npm run test:smoke` and check the project in the browser.

Update the README project table when the showcase changes. Home shows the first three projects in `projects.js`; order the file accordingly.

### Experience

Update `src/content/experience.js`. The smoke test expects three records with NTI first; adjust that assertion if the timeline changes on purpose.

### Contact

GitHub and LinkedIn come from `profile.links`. The email address appears only inside the `mailto:` link in `src/pages/Network.jsx` and is never rendered as text; keep it that way.

## Motion rules

- **Wait for the stage.** Entrance animations must start through `onStageReady` (or `onIntroDone`), so they never play behind the preloader or a page transition.
- **Animate opacity, not visibility, on containers** that hold content created later; children inherit `visibility` and record it as their starting state.
- **Never transform the whole page per frame.** The page transition moves two small curtain halves; the page itself stays still.
- **Respect reduced motion.** Check `useMotionPreference()` and render the final state when it is on.

## Verify a change

```bash
npm ci
npm run test:smoke
npm run build
npm run preview
```

For interface changes, also check in the browser:

- Every page, including a direct reload of each URL.
- Rapid page switching, the browser back button, and returning to a page mid-transition.
- Project deep links and the remembered selection on Work.
- A 390px-wide phone screen: no sideways scroll, the main buttons in the first screen.
- Keyboard focus, tab selection, and skip-to-content.
- Device, Full, and Reduced motion settings.

## Vercel deployment

The canonical URL is <https://nuryanfa.vercel.app/>. Pushing to `main` deploys to production.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` serves clean URLs and falls back to `/index.html`, so React Router URLs load directly. Keep that fallback when moving to another host.

The older GitHub Pages scripts (`npm run deploy`) are not the live workflow. When changing the domain, update `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/content/seo.js` and the README links together.

## Refresh showcase images

Capture the built site after the intro has played (set `sessionStorage["lx-intro-seen"] = "1"` to skip it) and the entrance motion has settled:

- `docs/images/portfolio-desktop.png`: Home at 1440×900
- `docs/images/portfolio-work.png`: Work at 1440×900
- `docs/images/portfolio-mobile.png`: Home at 390×844

Re-render the Open Graph images in `public/og/` whenever page titles or the visual style change.
