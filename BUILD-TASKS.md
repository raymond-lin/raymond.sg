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

## Launch (Cloudflare + GA4 + email)

Do 1 to 3 in order. Step 4 (email) is independent and can be done any time.
Before starting, make sure `main` has the latest site and CI is green: Cloudflare deploys `main` to production.

### 1. Connect the repo in Cloudflare (Pages)
- [ ] Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** tab → **Import an existing Git repository**.
      The default Create screen builds a Worker. Use the Pages tab (or the "Looking to deploy Pages? Get started" link at the bottom): a Worker would need a `wrangler` config this repo doesn't have.
- [ ] **Connect GitHub**. In the GitHub app install, pick **Only select repositories** → `raymond.sg` (it's private, so Cloudflare needs this grant).
- [ ] Set up builds and deployments:
  - Project name: `raymond-sg` (gives `raymond-sg.pages.dev`)
  - Production branch: `main`
  - Framework preset: **Astro** (fills build command `npm run build` and output directory `dist`)
  - Root directory: leave blank
  - **Environment variables (advanced)**, so the first build already has analytics:
    - `PUBLIC_GA4_ID` = `G-83W1EJHLHE` (type: Text, not Secret; it ends up in the page source anyway)
    - `NODE_VERSION` = `22` (same as CI)
- [ ] **Save and Deploy**. The build log should end with "Success: Your site was deployed!". Open `https://raymond-sg.pages.dev` and check the page renders, both themes work and screenshots load.
- [ ] Settings → **Variables and Secrets**: confirm `PUBLIC_GA4_ID` is set for **Production** only. Remove it from **Preview** if it's there, so branch previews don't send analytics. Keep `NODE_VERSION` in both.
- [ ] Settings → **Builds** → **Branch control**: leave "Automatic deployments" on for `main`. Preview deployments for other branches are fine to keep (each gets its own `*.raymond-sg.pages.dev` URL).

Notes:
- `PUBLIC_*` variables are baked in at build time. After adding or changing one, redeploy: Deployments → latest production deployment → **⋯** → **Retry deployment**.
- Every push to `main` deploys automatically, including the weekly CNET stats commit.

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
- [ ] Workers & Pages → `raymond-sg` → **Custom domains** → **Set up a custom domain** → `raymond.sg` → Continue → **Activate domain**.
      If an old apex A/AAAA/CNAME record exists, Cloudflare asks to replace it; delete that record only. Cloudflare then adds a proxied CNAME `raymond.sg → raymond-sg.pages.dev`.
- [ ] Repeat for `www.raymond.sg` (gives `www` a proxied record and a certificate, needed for the redirect below).
- [ ] Wait for both domains to show **Active** (SSL certificate issued, usually a few minutes).
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

`raymond-sg.pages.dev` stays reachable. That's fine: every page's canonical URL points at `https://raymond.sg`.

### 4. Route hello@raymond.sg to Gmail
Short answer: **only Cloudflare is required** to receive hello@ mail. Gmail is needed only if you want to label it and **reply as** hello@. Brevo usually needs nothing, because it authenticates the whole domain, not single addresses.

**A. Cloudflare (required: receiving)**
- [ ] Zone `raymond.sg` → **Email** → **Email Routing** → **Routing rules** → **Custom addresses** → **Create address**.
  - Custom address: `hello`
  - Action: **Send to an email**
  - Destination: the same Gmail already used for raymond@ (already verified, so no new confirmation email)
  - Save, and check the rule shows **Active**.
- [ ] Don't change any DNS records: the MX and SPF records added for raymond@ cover every address on the domain.
- [ ] Leave the **Catch-all** rule disabled or set to Drop (catch-alls attract spam).
- [ ] Test from a **different** account (a phone mail app, Outlook, a friend). Gmail often hides mail you send to yourself through a forward, so a test from the same Gmail can look like a failure.
      Email Routing → **Overview** → activity log should show the message as "Forwarded".

**B. Gmail (optional: label it and reply as hello@)**
- [ ] Label: Gmail search bar → **Show search options** → To: `hello@raymond.sg` → **Create filter** → Apply the label `raymond.sg/hello`, tick **Never send it to Spam** → Create.
- [ ] Settings (gear) → **See all settings** → **Accounts and Import** → **Send mail as**. First click **edit info** on the existing raymond@raymond.sg entry and note its SMTP settings.
- [ ] **Add another email address**:
  - Name: Raymond Lin, Email: `hello@raymond.sg`, **Treat as an alias**: ticked → Next
  - SMTP Server: `smtp-relay.brevo.com`, Port: `587`
  - Username: your Brevo SMTP login (Brevo → **SMTP & API** → **SMTP** tab; looks like `xxxxxx@smtp-brevo.com`, not your Gmail)
  - Password: a Brevo SMTP key. Reusing the raymond@ key works; generating a new one named `gmail-hello` lets you revoke either separately.
  - **Secured connection using TLS** → Add Account
- [ ] Gmail sends a confirmation code to hello@raymond.sg. It arrives in your Gmail through the route from part A (so do A first). Click the link or paste the code.
- [ ] Back in **Send mail as** → "When replying to a message": select **Reply from the same address the message was sent to**.
- [ ] Test: reply to the test message from part A, choosing hello@ as From. On the receiving side, open the message → **Show original** (Gmail) or view headers: SPF, DKIM and DMARC should all say **PASS**.

**C. Brevo (only if sending from hello@ fails)**
- [ ] Brevo → **Senders, Domains & Dedicated IPs** → **Domains**: `raymond.sg` should show **Authenticated**. If so, hello@ can already send; nothing to do.
- [ ] If Gmail's SMTP step or a test send is rejected with a sender error, go to **Senders** → **Add sender** → `hello@raymond.sg`, then confirm with the code (it arrives via part A).
- [ ] The Brevo free plan's daily sending limit is shared by raymond@ and hello@. Fine for personal mail.

**DNS sanity check (one-off)**
- [ ] DNS → Records, filter by TXT on `raymond.sg`: there must be exactly **one** record starting `v=spf1`. If both Cloudflare and Brevo are listed, they go in that same record (e.g. `v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all`). Two separate `v=spf1` records make SPF fail for both. Since raymond@ already sends and receives fine, this is most likely correct already.

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
