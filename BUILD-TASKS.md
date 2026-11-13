# raymond.sg build tasks

## Done
- [x] Private GitHub repo, Astro + TypeScript + Tailwind
- [x] Home page ported from the design reference (`docs/design-reference.html`) into components
- [x] Projects as a content collection (one Markdown file each)
- [x] Self-hosted fonts (Fontsource)
- [x] Light/dark theme (system default, remembered)
- [x] Real screenshots: 9toFIRE, AI Verdict, Lyricsdecode, Decide A Place, MD5 & SHA (optimised to WebP at build)
- [x] GA4 wiring (loads only when `PUBLIC_GA4_ID` is set) with events for Visit / Download / email clicks and copy
- [x] CNET stats data file + weekly GitHub Action; badge hides if not top 3
- [x] Sitemap, robots.txt, canonical URL, favicon, 404 page
- [x] CI: type check, build, Playwright smoke tests (desktop + phone, links, dashes rule, theme, copy button)
- [x] CLAUDE.md with content and design rules
- [x] Cloudflare Worker `raymond-sg` connected to GitHub; every push to `main` builds and deploys
- [x] raymond.sg on the Worker, www.raymond.sg redirects to raymond.sg
- [x] GA4 (`G-83W1EJHLHE`) in the production build and seen in Realtime
- [x] hello@raymond.sg routed to Gmail (Cloudflare Email Routing)

## Launch follow-ups

### Make the site public (Cloudflare Access is on)
raymond.sg currently redirects visitors to a Cloudflare Access sign-in page (`raym0nd.cloudflareaccess.com`). You don't see it because you're signed in. Until this is off, nobody else can see the site, and GA4 only records your visits.
- [ ] Workers & Pages → `raymond-sg` → **Access** tab → turn protection off for `raymond.sg` (and `www.raymond.sg` if listed).
- [ ] If it's still on: one.dash.cloudflare.com (Zero Trust) → **Access controls** → **Applications** → delete the application for `raymond.sg`.
- [ ] Check in a private/incognito window: https://raymond.sg loads with no sign-in.
- [ ] While there: **Settings** → **Build** → **Branch control**: decide on preview builds. If on, previews (with GA4) build for every branch, including `claude/...` ones.

### GA4 settings (analytics.google.com → Admin, gear icon bottom left)
Do these after the site is public, so the checks below see real visits.

**Data retention (2 minutes)**
- [ ] Admin → **Data collection and modification** → **Data retention** → Event data retention **14 months** → **Save**. (Default is 2 months; Explorations can't look further back than this.)
- How to check: reopen the page, it shows 14 months.

**Custom dimensions (so reports show which project was clicked)**
- [ ] Admin → **Data display** → **Custom definitions** → **Create custom dimension**:
  - Name `Project`, Scope **Event**, Event parameter `project` → Save
  - Name `Contact method`, Scope **Event**, Event parameter `method` → Save
- How to check: both appear in the Custom dimensions list. They fill in only for events after they were created, and show in reports within about 24 to 48 hours.

**Key events**
- [ ] Admin → **Data display** → **Key events** → **New key event** → type `contact` → Save. Repeat for `download` and `outbound`. Names are lowercase and must match exactly.
- How to check:
  1. Admin → Data display → **Events**: after a day, `contact`, `download` and `outbound` are listed with the **Mark as key event** star/toggle on.
  2. Reports → **Engagement** → **Key events** (or the "Key events" column in Reports → Acquisition) shows counts the day after you click them.

**Internal traffic filter (so your own visits don't count)**
- [ ] Find your IP: search "what is my ip" on the home network. Note the IPv4 (and IPv6 if shown).
- [ ] Admin → **Data streams** → the raymond.sg web stream → **Configure tag settings** → **Show more** → **Define internal traffic** → **Create**:
  - Rule name `Home`, traffic_type value `internal`
  - IP address **equals** your IPv4. If you have IPv6, **Add condition** → **begins with** the first four groups (e.g. `2406:3003:1234:5678`).
  - **Create**
- [ ] Admin → **Data collection and modification** → **Data filters** → **Internal Traffic** → should say **Testing**. Leave it in Testing for now.
- [ ] Test it: visit https://raymond.sg from home. Reports → **Realtime** → **Add comparison** (top) → Dimension **Test data filter name** → exactly matches `Internal Traffic` → Apply. If your visit shows under that comparison, the rule matches you.
- [ ] Then Data filters → Internal Traffic → **⋯** → **Activate**. Your home visits stop being recorded (filtered data can't be recovered, so test first).
- [ ] Home IPs change now and then. If your own visits start showing in Realtime again, update the IP in the rule. Visits from your phone on mobile data are not filtered.

**Verify events end to end** (after the filter is in Testing, or from mobile data)
- [ ] Reports → **Realtime**: click a project link, the Download link, the email link and the Copy button on raymond.sg. Within a minute "Event count by Event name" lists `outbound`, `download` and `contact`. Click an event name to see its `project` / `method` values.
- [ ] For more detail: tagassistant.google.com → **Add domain** → `https://raymond.sg` → **Connect**, then Admin → **DebugView** shows each event with its parameters.

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
