# raymond.sg

Source for [raymond.sg](https://raymond.sg), built with [Astro](https://astro.build) and Tailwind CSS.

## Run it locally

```sh
npm install
npm run dev        # http://localhost:4321
```

Before pushing:

```sh
npm run check && npm run build && npm test
```

The first `npm test` on a new machine needs a browser: `npx playwright install chromium`.

## Add or edit a project

1. Add a screenshot to `src/assets/projects/` (about 1280×800 or larger).
2. Copy any file in `src/content/projects/` and edit the front matter: title, order, summary, specs, link, screenshot.
3. Run `npm run dev` to check it.

## Deploy (Cloudflare)

The site runs as the Cloudflare Worker `raymond-sg` (Workers & Pages), connected to this GitHub repo. Every push to `main` builds (`npm run build`) and deploys automatically, including the weekly CNET stats update.

- Build variables (Worker → Settings → Build → Variables and secrets): `PUBLIC_GA4_ID`. These are read at build time, so rebuild after changing one.
- Domains (Worker → Domains): `raymond.sg`; `www.raymond.sg` redirects to it.
- Email: Cloudflare Email Routing sends `hello@raymond.sg` to Gmail.
- Cloudflare builds do not wait for GitHub CI, so run the checks above before pushing to `main`.

## Automation

- **CI** (`.github/workflows/ci.yml`): type check, build and Playwright tests on every push and pull request.
- **CNET stats** (`.github/workflows/cnet-stats.yml`): every Monday, reads total downloads and the category rank for MD5 & SHA Checksum Utility, and commits `src/data/cnet.json` if anything changed. If the app leaves the top 3, the badge hides itself. Run it by hand from the Actions tab ("Run workflow").
