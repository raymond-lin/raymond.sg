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
- [x] hello@raymond.sg routed to Gmail (Cloudflare Email Routing), steps kept below under Launch step 4

## Launch (Cloudflare + GA4 + email)

Do 1 to 3 in order. Step 4 (email) is done.
Before starting, make sure `main` has the latest site (including `wrangler.jsonc`) and CI is green: Cloudflare deploys `main` to production.

### 1. Connect the repo in Cloudflare (Workers)

Cloudflare's "Create an app" flow now creates a **Worker** that serves the built site as static files. The repo has a `wrangler.jsonc` for this (Worker name `raymond-sg`, serves `dist/`, unknown URLs get the site's 404 page). **`wrangler.jsonc` must be on `main` before you click Deploy.** Without it, `wrangler deploy` tries to auto-configure Astro during the build, which can be unpredictable.

**1a. Start the app**
- [ ] dash.cloudflare.com → your account → **Workers & Pages** (under **Compute** in the newer sidebar) → **Create application**.
- [ ] Select a method: **Import a repository** (or "Continue with GitHub").

**1b. Install the Cloudflare app on GitHub (one-off)**
- [ ] Click **Connect GitHub** (or **+ Add account**). A GitHub window opens (allow pop-ups for dash.cloudflare.com if nothing appears).
- [ ] Sign in as `raymond-lin` if asked, with 2FA.
- [ ] On **Install & Authorize Cloudflare Workers and Pages**:
  - Install on your personal account `raymond-lin`
  - Repository access: **Only select repositories** → `raymond.sg`
  - The permissions it asks for (read code; write checks, deployments, pull requests) are how it posts build status and preview links. That's expected.
  - **Install & Authorize**, then confirm your password or 2FA if GitHub asks.
- [ ] Back in Cloudflare, **Select a repository**: `raymond-lin/raymond.sg` → **Next**.
- [ ] Repo not in the list? GitHub → avatar → **Settings** → **Applications** → **Installed GitHub Apps** → **Cloudflare Workers and Pages** → **Configure** → add `raymond.sg` → **Save**, then refresh the Cloudflare page.

**1c. Set up your application (the "Create and deploy" screen)**
- [ ] Project name: `raymond-sg` (must match `name` in `wrangler.jsonc`, or builds fail)
- [ ] Build command: `npm run build` (the field says Optional; it isn't for this site)
- [ ] Deploy command: leave `npx wrangler deploy`
- [ ] Preview command: leave the default
- [ ] **Enable Preview builds**: turn **off** for now. The build variable below applies to every build, so previews would send GA4 hits from a `workers.dev` address. You can turn it on later (Settings → Build) if you want a URL per branch.
- [ ] **Protect with Cloudflare Access**: leave off.
- [ ] Open **Advanced settings**:
  - Path: leave `/`
  - API token: leave **Create new token**; keep the suggested name (or call it `raymond-sg builds`). Cloudflare creates it for the build to deploy with.
  - Variable name `PUBLIC_GA4_ID`, value `G-83W1EJHLHE`
  - If there's a way to add another row: `NODE_VERSION` = `22` (same as CI). If not, add it after the first deploy (below).
- [ ] **Deploy**. Watch the log: `npm run build` → "Complete!", then `wrangler deploy` → "Read 36 files from the assets directory" (or similar) and "Deployed raymond-sg".

**1d. After the first deploy**
- [ ] Open the `https://raymond-sg.<your-subdomain>.workers.dev` link from the deploy screen. Check the page renders, both themes work and screenshots load.
- [ ] Check GA4 got into the build: on that page, View Source and search for `G-83W1EJHLHE`.
      Not there? The variable went in as a runtime variable, which Astro can't see. Go to the Worker → **Settings** → **Build** → **Variables and secrets** → **Add**: `PUBLIC_GA4_ID` = `G-83W1EJHLHE` (and `NODE_VERSION` = `22`). Then **Deployments** → **View build history** → **Retry build** (or push any commit to `main`).
      Build variables live under **Settings → Build**, not under the Worker's top-level "Variables and Secrets" (those are for server code, which this site doesn't have).
- [ ] Settings → **Build** → **Git repository** shows `raymond-lin/raymond.sg`; **Branch control** production branch is `main`.
- [ ] GitHub: the latest commit on `main` shows a **Workers Builds: raymond-sg** check next to the CI check. "Details" opens the Cloudflare build log.

Notes:
- `PUBLIC_*` variables are baked in at build time. After changing one, rebuild (Retry build, or push to `main`).
- Every push to `main` deploys automatically, including the weekly CNET stats commit (bot commits trigger Cloudflare too).
- Cloudflare builds on its own and does **not** wait for the GitHub CI workflow. A push to `main` that fails tests still deploys if the build succeeds. So keep running `npm run check && npm run build && npm test` before pushing to `main`, or merge through pull requests and only merge when CI is green. (Making GitHub enforce that with branch protection on a private repo needs GitHub Pro.)
- Test the Worker locally: `npm run build && npx wrangler dev`, then open http://localhost:8787.
- To change or remove the link later: Worker → Settings → Build → Git repository → **Manage**. To revoke from the GitHub side: Settings → Applications → Installed GitHub Apps → Cloudflare Workers and Pages → Configure.

### 2. GA4 (measurement ID `G-83W1EJHLHE`)
Cloudflare side is done in step 1 (`PUBLIC_GA4_ID`). Everything below is in analytics.google.com → **Admin** (gear, bottom left).
- [ ] **Data collection and modification** → **Data streams** → the web stream. Confirm Measurement ID is `G-83W1EJHLHE` and Stream URL is `https://raymond.sg`. If the stream belongs to another site, edit the URL or create a new web stream for raymond.sg (then use its new ID in Cloudflare and redeploy).
- [ ] Same stream page: leave **Enhanced measurement** on. It also logs GA4's own `click` (outbound) and `file_download` events; ignore those and use the site's own `outbound`, `download` and `contact` events, which carry the project name.
- [ ] **Data collection and modification** → **Data retention** → Event data retention: **14 months** → Save (the default is 2 months).
- [ ] **Data display** → **Custom definitions** → **Create custom dimension** (scope: Event), so reports can show which project was clicked:
  - Dimension name `Project`, event parameter `project`
  - Dimension name `Contact method`, event parameter `method` (`email_copy` when the Copy button is used)
  - `link_url` needs nothing: it's already the built-in "Link URL" dimension.
- [ ] **Data display** → **Key events** → **New key event**, one at a time: `contact`, `download`, `outbound`. (These can be created before the events have fired.)
- [ ] Internal traffic, so your own visits don't count:
  1. Data streams → web stream → **Configure tag settings** → **Show more** → **Define internal traffic** → **Create**.
     Rule name `Home`, `traffic_type` value `internal`, IP address **equals** your public IPv4 (search "what is my ip"). If you also have IPv6, add a second condition with **begins with** your IPv6 prefix (first four groups).
  2. Admin → **Data collection and modification** → **Data filters** → "Internal Traffic" filter. It starts in **Testing**. Switch to **Active** after step 3's check works.
  3. Home IPs can change. If your visits start showing in Realtime again, update the IP.
- [ ] After step 3, verify on the real domain:
  - Open `https://raymond.sg` in a private window (or before activating the internal filter). **Reports** → **Realtime** should show 1 user within a minute.
  - Click a project link, the Download link and the email Copy button. Realtime → "Event count by Event name" should show `outbound`, `download` and `contact`.
  - For a detailed check, use tagassistant.google.com → Add domain `https://raymond.sg` → then Admin → **DebugView**.
  - Key events and custom dimensions can take up to 24 to 48 hours to appear in standard reports.

### 3. Point raymond.sg at it
The `raymond.sg` zone is already on Cloudflare (Email Routing for raymond@ works), so this is all in the same dashboard.
- [ ] Back up DNS first: zone `raymond.sg` → **DNS** → **Records** → **Import and Export** → **Export**.
- [ ] Note any existing **A / AAAA / CNAME** records on `raymond.sg` (@) and `www`. Those are the only ones that change. Do **not** touch MX, TXT (SPF, DMARC, `brevo-code`), or the DKIM records (`cf2024-1._domainkey`, `brevo1._domainkey`, `brevo2._domainkey` or similar): they run your email.
- [ ] If DNS has an old A, AAAA or CNAME record on `raymond.sg` (@) or `www`, delete just those records first. Cloudflare won't attach a Worker to a hostname that already has one.
- [ ] Workers & Pages → `raymond-sg` → **Settings** → **Domains & Routes** → **+ Add** → **Custom domain** → `raymond.sg` → **Add domain**.
      Cloudflare creates the DNS record itself (it shows in DNS → Records as type "Worker") and issues the certificate.
- [ ] Repeat for `www.raymond.sg` (gives `www` a proxied record and a certificate, needed for the redirect below).
- [ ] Wait for both to show as active in Domains & Routes (usually a few minutes).
- [ ] Optional, once raymond.sg works: same page → **workers.dev** → **Disable**, so the site only lives at raymond.sg. (Every page's canonical URL already points at `https://raymond.sg`, so leaving it on is harmless.)
- [ ] Redirect `www` to the bare domain: zone `raymond.sg` → **Rules** → **Overview** → **Create rule** → **Redirect Rule** → template **Redirect from WWW to root** → Deploy.
      (Manual version: when hostname equals `www.raymond.sg`, dynamic URL `concat("https://raymond.sg", http.request.uri.path)`, status 301, preserve query string on.)
- [ ] **SSL/TLS** → **Edge Certificates** → **Always Use HTTPS**: On.
- [ ] Check:
  - `https://raymond.sg` loads the new site with a valid padlock
  - `http://raymond.sg` → redirects to `https://raymond.sg`
  - `https://www.raymond.sg/test` → redirects to `https://raymond.sg/test`
  - `https://raymond.sg/sitemap-index.xml` and `/robots.txt` load
  - `https://raymond.sg/does-not-exist` shows the site's 404 page
  - Email to raymond@raymond.sg still arrives (proves MX and SPF weren't touched)


### 4. Route hello@raymond.sg to Gmail (done)
Short answer: **only Cloudflare is required** to receive hello@ mail. Gmail is needed only if you want to label it and **reply as** hello@. Brevo usually needs nothing, because it authenticates the whole domain, not single addresses.

**A. Cloudflare (required: receiving)**
- [x] Zone `raymond.sg` → **Email** → **Email Routing** → **Routing rules** → **Custom addresses** → **Create address**.
  - Custom address: `hello`
  - Action: **Send to an email**
  - Destination: the same Gmail already used for raymond@ (already verified, so no new confirmation email)
  - Save, and check the rule shows **Active**.
- [x] Don't change any DNS records: the MX and SPF records added for raymond@ cover every address on the domain.
- [x] Leave the **Catch-all** rule disabled or set to Drop (catch-alls attract spam).
- [x] Test from a **different** account (a phone mail app, Outlook, a friend). Gmail often hides mail you send to yourself through a forward, so a test from the same Gmail can look like a failure.
      Email Routing → **Overview** → activity log should show the message as "Forwarded".

**B. Gmail (optional: label it and reply as hello@)**
- [x] Label: Gmail search bar → **Show search options** → To: `hello@raymond.sg` → **Create filter** → Apply the label `raymond.sg/hello`, tick **Never send it to Spam** → Create.
- [x] Settings (gear) → **See all settings** → **Accounts and Import** → **Send mail as**. First click **edit info** on the existing raymond@raymond.sg entry and note its SMTP settings.
- [x] **Add another email address**:
  - Name: Raymond Lin, Email: `hello@raymond.sg`, **Treat as an alias**: ticked → Next
  - SMTP Server: `smtp-relay.brevo.com`, Port: `587`
  - Username: your Brevo SMTP login (Brevo → **SMTP & API** → **SMTP** tab; looks like `xxxxxx@smtp-brevo.com`, not your Gmail)
  - Password: a Brevo SMTP key. Reusing the raymond@ key works; generating a new one named `gmail-hello` lets you revoke either separately.
  - **Secured connection using TLS** → Add Account
- [x] Gmail sends a confirmation code to hello@raymond.sg. It arrives in your Gmail through the route from part A (so do A first). Click the link or paste the code.
- [x] Back in **Send mail as** → "When replying to a message": select **Reply from the same address the message was sent to**.
- [x] Test: reply to the test message from part A, choosing hello@ as From. On the receiving side, open the message → **Show original** (Gmail) or view headers: SPF, DKIM and DMARC should all say **PASS**.

**C. Brevo (only if sending from hello@ fails)**
- [x] Brevo → **Senders, Domains & Dedicated IPs** → **Domains**: `raymond.sg` should show **Authenticated**. If so, hello@ can already send; nothing to do.
- [x] If Gmail's SMTP step or a test send is rejected with a sender error, go to **Senders** → **Add sender** → `hello@raymond.sg`, then confirm with the code (it arrives via part A).
- [x] The Brevo free plan's daily sending limit is shared by raymond@ and hello@. Fine for personal mail.

**DNS sanity check (one-off)**
- [x] DNS → Records, filter by TXT on `raymond.sg`: there must be exactly **one** record starting `v=spf1`. If both Cloudflare and Brevo are listed, they go in that same record (e.g. `v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all`). Two separate `v=spf1` records make SPF fail for both. Since raymond@ already sends and receives fine, this is most likely correct already.

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
