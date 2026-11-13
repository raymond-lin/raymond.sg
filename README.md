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

The site runs as a Cloudflare Worker serving the static build (`wrangler.jsonc` points it at `dist/`). Full step-by-step (Cloudflare, GA4, domain, email) is in `BUILD-TASKS.md` under "Launch". In short:

1. Cloudflare dashboard → Workers & Pages → Create application → Import a repository → this GitHub repo.
2. Project name `raymond-sg` (must match `wrangler.jsonc`), build command `npm run build`, deploy command `npx wrangler deploy`.
3. Build variables: `PUBLIC_GA4_ID` (GA4 measurement ID) and `NODE_VERSION=22`.
4. Worker → Settings → Domains & Routes → add the custom domains `raymond.sg` and `www.raymond.sg`.
5. Email: Cloudflare → Email → Email Routing → `hello@raymond.sg` goes to Gmail (done).

Every push to `main` then deploys automatically, including the weekly CNET stats update. To try the Worker locally: `npm run build && npx wrangler dev`.

## Automation

- **CI** (`.github/workflows/ci.yml`): type check, build and Playwright tests on every push and pull request.
- **CNET stats** (`.github/workflows/cnet-stats.yml`): every Monday, reads total downloads and the category rank for MD5 & SHA Checksum Utility, and commits `src/data/cnet.json` if anything changed. If the app leaves the top 3, the badge hides itself. Run it by hand from the Actions tab ("Run workflow").
