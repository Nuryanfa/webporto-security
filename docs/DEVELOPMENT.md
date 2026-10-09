# Development guide

## Source layout

| Path | Responsibility |
| --- | --- |
| `src/App.jsx` | Routes, motion configuration, and Vercel measurement components |
| `src/pages/` | Nexus, project archive, experience timeline, contact, overview, and fallback page |
| `src/components/` | Navigation, scenes, motion primitives, and reusable interface components |
| `src/content/profile.js` | Name, positioning, role, tagline, and location |
| `src/content/projects.js` | Project codes, descriptions, statuses, tags, and repository links |
| `src/content/experience.js` | Experience records and their highlights |
| `src/content/projectScenes.js` | Three-stage conceptual maps keyed by project code |
| `src/utils/` | Motion preferences and interaction utilities |
| `src/main.jsx` | React entry point and ordered CSS imports |
| `public/` | Public portrait, sitemap, and robots file |
| `scripts/smoke-render.mjs` | Render and content consistency checks |
| `docs/images/` | Real desktop and mobile portfolio screenshots used in the README |

The stylesheets are loaded in the order declared in `src/main.jsx`. Later styles can override earlier rules; inspect that order before adjusting shared styles.

## Update content

### Profile and contact

Edit `src/content/profile.js` for the central profile copy. Contact destinations are currently defined in `src/pages/Network.jsx`; check the overview page and README contact links when changing them.

The portrait used by the Nexus is `public/profile.webp`. Keep its public path stable or update the component reference.

### Projects

1. Add or update a project in `src/content/projects.js`.
2. Keep every `code` unique and stable: it identifies the project in URLs such as `/archive?project=AEGIS`.
3. Add exactly three corresponding stages in `src/content/projectScenes.js` under the same code.
4. Describe implemented scope separately from planned work. Use status labels that match the project repository.
5. Run `npm run test:smoke` and inspect the selected project in the browser.

Update the README project table if the public showcase changes.

### Experience

Update `src/content/experience.js`. The smoke script currently expects three records with NTI first; adjust that explicit assertion if the timeline intentionally changes.

## Verify a change

```bash
npm ci
npm run test:smoke
npm run build
npm run preview
```

For interface changes, also inspect:

- The Nexus and all main routes, including direct page reloads.
- Rapid navigation and project/contact switching.
- Project deep links and returning to a remembered selection.
- Narrow mobile screens and bottom-navigation clearance.
- Keyboard focus, tab selection, and skip-to-content navigation.
- Device, Full, and Reduced motion settings.

## Vercel deployment

The canonical site URL in the current metadata is **https://www.nuryanfa.my.id/**.

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` rewrites incoming routes to `/index.html`, allowing React Router URLs to load directly. Keep that fallback when moving to another static host.

The repository also retains older GitHub Pages deploy scripts. They publish to `gh-pages`; they are not the Vercel deployment workflow. Subpath hosting needs separate asset-base and router configuration.

When changing the public domain, review `index.html`, `public/sitemap.xml`, `public/robots.txt`, repository homepage metadata, and README links together.

## Refresh showcase images

Capture the actual site after the entrance motion settles. Save the desktop and mobile images as:

- `docs/images/portfolio-desktop.png`
- `docs/images/portfolio-mobile.png`

Use an uncluttered browser viewport rather than an editor screenshot. The images are a visual snapshot; the live site remains the place to experience motion.
