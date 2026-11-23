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
- [x] Claims checked: 9toFIRE runs its 1,000 simulations in the browser and sends no inputs anywhere (no fetch calls; CSP allows only itself, GA4 and Cloudflare analytics; GA4 events carry names only). Email & Text Hash Generator works on your own machine, offline.
- [x] Open Graph share image (`public/og.png`, 1200 × 630); regenerate with `npm run og` after changing the name, role or headline
- [x] Project screenshots follow the site theme (light and dark pairs for 9toFIRE, AI Verdict, Lyricsdecode and Decide A Place)
- [x] Pro screenshots for MD5 & SHA Checksum Utility (3.0 Pro) and Email & Text Hash Generator (1.0 Pro), stored in the repo

## Launch follow-ups

### Make the site public (Cloudflare Access is on)
raymond.sg currently redirects visitors to a Cloudflare Access sign-in page (`raym0nd.cloudflareaccess.com`). You don't see it because you're signed in. Until this is off, nobody else can see the site, and GA4 only records your visits.
- [ ] Workers & Pages → `raymond-sg` → **Access** tab → turn protection off for `raymond.sg` (and `www.raymond.sg` if listed).
- [ ] If it's still on: one.dash.cloudflare.com (Zero Trust) → **Access controls** → **Applications** → delete the application for `raymond.sg`.
- [ ] Check in a private/incognito window: https://raymond.sg loads with no sign-in.
- [x] Preview builds on: every branch, including `claude/...` ones, gets a Cloudflare preview link on its pull request. GA4 also loads on previews (accepted for now; to exclude them later, load GA4 only on raymond.sg).

## Screenshots from Raymond

Requirements for every light and dark pair:
- Page content only (no browser bars), 1280 × 800 at 2x, so the file is 2560 × 1600 PNG. In Chrome: DevTools (Cmd+Opt+I) → device toolbar (Cmd+Shift+M) → Responsive, 1280 × 800, DPR 2 → Cmd+Shift+P → "Capture screenshot".
- Light and dark taken one after the other: same page, same scroll position, same data, same panels open. Only the theme changes.
- The card shows the top 16:10 of the image, so keep the important part near the top.
- Nothing personal in view: account names or emails, chat history, other tabs.
- Save as `src/assets/projects/<name>.png` (light) and `<name>-dark.png` (dark), or send them over and they get added with `screenshotDark`.

- [ ] AI Verdict: a better-matched light and dark pair of the extension dashboard, same question and same layout in both. For now the card uses the Dashboard and Light Theme shots from the aiverdict.github.io gallery; their panels differ slightly in height.

More screenshots per project, for the case study pages (the home page cards keep one image each). Three to five per project, one per main screen or flow, same size rules as above. Light only is fine; add dark versions if the page should follow the theme.
- [ ] 9toFIRE: the inputs, the result, the market simulation view, and one detail screen (for example CPF or HDB settings).
- [ ] AI Verdict: dashboard, The Verdict, River view, settings. The gallery on aiverdict.github.io already has these; send newer ones if they have changed.
- [ ] Lyricsdecode: the home page, one song explainer page, and the quiz.
- [ ] Decide A Place: search, results with filters, and "Decide for Me".
- [ ] MD5 & SHA Checksum Utility: Folder comparison and the command line (both already on the WordPress download page, so they can be reused).
- [ ] Email & Text Hash Generator: the Text panel and a sample input and output (both already on the WordPress download page).

## Next
- [ ] First run of "Update project stats" from the Actions tab (CNET downloads and rank, Lyricsdecode song count). CNET refused automated requests when tested from a cloud server (Fastly "412"), so GitHub may be blocked too. If it is, the workflow opens the issue "Project stats need a look" and mentions you, so GitHub emails you; the site keeps its last figures. The Softpedia figure in `src/data/cnet.json` is updated by hand (Softpedia blocks bots); the issue "Update download figures" reminds you every three months. If CNET is blocked every week, turn off its step in `stats.yml` and update it with Softpedia from that reminder.
- [ ] 9toFIRE case study page at `/projects/9tofire/` (Problem, My role, Stack, One hard technical decision, Result, Screenshots, Links), then link it from the card
- [ ] raym0nd.com redirect: keep the Pro purchase pages working before redirecting anything

## Later
- [ ] Writing section: articles collection + RSS; publish here first, then import to Medium so its canonical points back
- [ ] Move the Windows software pages from WordPress to raymond.sg/software/… with redirects
- [ ] Trim the Tools list once case studies show the tools in use
