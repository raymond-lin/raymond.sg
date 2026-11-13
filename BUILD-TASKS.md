# raymond.sg build tasks

## Done
- [x] Private GitHub repo, Astro + TypeScript + Tailwind
- [x] Home page ported from the design reference (`docs/design-reference.html`) into components
- [x] Projects as a content collection (one Markdown file each)
- [x] Self-hosted fonts (Fontsource)
- [x] Light/dark theme (system default, remembered)
- [x] Real screenshots: 9toFIRE, AI Verdict, Lyricsdecode, Decide A Place, MD5 & SHA (optimised to WebP at build)
- [x] GA4 wiring (loads only when `PUBLIC_GA4_ID` is set) with events for Visit / Download / email clicks
- [x] CNET stats data file + weekly GitHub Action; badge hides if not top 3
- [x] Sitemap, robots.txt, canonical URL, favicon, 404 page
- [x] CI: type check, build, Playwright smoke tests (desktop + phone, links, dashes rule, theme, logo scroll)
- [x] CLAUDE.md with content and design rules
- [x] Cloudflare Worker `raymond-sg` connected to GitHub; every push to `main` builds and deploys
- [x] raymond.sg on the Worker, www.raymond.sg redirects to raymond.sg
- [x] GA4 (`G-83W1EJHLHE`) in the production build and seen in Realtime; GA4 admin settings done (key events skipped on purpose: events are still recorded under Reports → Engagement → Events)
- [x] hello@raymond.sg routed to Gmail (Cloudflare Email Routing)
- [x] Enterprise work section, mobile menu, privacy page (GA4, 14-month retention, no banner)

## Launch follow-ups

### Make the site public (Cloudflare Access is on)
raymond.sg currently redirects visitors to a Cloudflare Access sign-in page (`raym0nd.cloudflareaccess.com`). You don't see it because you're signed in. Until this is off, nobody else can see the site, and GA4 only records your visits.
- [ ] Workers & Pages → `raymond-sg` → **Access** tab → turn protection off for `raymond.sg` (and `www.raymond.sg` if listed).
- [ ] If it's still on: one.dash.cloudflare.com (Zero Trust) → **Access controls** → **Applications** → delete the application for `raymond.sg`.
- [ ] Check in a private/incognito window: https://raymond.sg loads with no sign-in.
- [ ] While there: **Settings** → **Build** → **Branch control**: decide on preview builds. If on, previews (with GA4) build for every branch, including `claude/...` ones.

## Next
- [ ] Email & Text Hash Generator: download its screenshot from WordPress into `src/assets/projects/` and switch `screenshotUrl` to `screenshot`
- [ ] First run of "Update CNET stats" from the Actions tab; check the log for warnings (CNET may block bots)
- [ ] Check before launch: 9toFIRE sends no user inputs to a server, and MD5 & SHA works fully offline (the Principles card says so)
- [ ] Open Graph share image (1200×630)
- [ ] 9toFIRE case study page at `/work/9tofire/` (Problem, My role, Stack, One hard technical decision, Result, Screenshots, Links), then link it from the card
- [ ] raym0nd.com redirect: keep the Pro purchase pages working before redirecting anything

## Later
- [ ] Writing section: articles collection + RSS; publish here first, then import to Medium so its canonical points back
- [ ] Move the Windows software pages from WordPress to raymond.sg/software/… with redirects
- [ ] Trim the Tools list once case studies show the tools in use
