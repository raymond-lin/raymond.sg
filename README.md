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

1. Cloudflare dashboard → Workers & Pages → Create → connect this GitHub repo.
2. Framework preset **Astro**, build command `npm run build`, output directory `dist`.
3. Add the environment variable `PUBLIC_GA4_ID` (your GA4 measurement ID) for production.
4. Add the custom domain `raymond.sg`.
5. Email: Cloudflare → Email → Email Routing → route `hello@raymond.sg` to your Gmail.

Every push to `main` then deploys automatically, including the weekly CNET stats update.

## Automation

- **CI** (`.github/workflows/ci.yml`): type check, build and Playwright tests on every push and pull request.
- **CNET stats** (`.github/workflows/cnet-stats.yml`): every Monday, reads total downloads and the category rank for MD5 & SHA Checksum Utility, and commits `src/data/cnet.json` if anything changed. If the app leaves the top 3, the badge hides itself. Run it by hand from the Actions tab ("Run workflow").
