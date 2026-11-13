# raymond.sg

Personal site for Raymond Lin (Singapore). Static Astro site: one home page today, project case studies and a writing section later.

## Commands
- `npm run dev`: local dev server
- `npm run build`: production build to `dist/`
- `npm run check`: Astro and TypeScript checks
- `npm test`: Playwright smoke tests (desktop and phone); builds must pass these
- `npm run cnet`: refresh `src/data/cnet.json` from CNET Download

## Where things live
- Projects: one Markdown file per project in `src/content/projects/` (schema in `src/content.config.ts`). Order with `order`. Screenshots in `src/assets/projects/`.
- Tools & platforms list: `src/data/tools.ts`
- Enterprise work (platforms delivered, no employer names or dates): `src/data/enterprise.ts`
- Privacy page: `src/pages/privacy.astro` (update it if analytics, hosting or data retention change)
- Site name, email, helpers (`floorLabel`, `shortDate`): `src/data/site.ts`
- CNET stats for the MD5 & SHA Checksum Utility: `src/data/cnet.json`, refreshed weekly by `.github/workflows/cnet-stats.yml`
- Styles: Tailwind 3 (`tailwind.config.cjs`) plus component classes in `src/styles/global.css` (`.muted`, `.accent-text`, `.eyebrow`, `.work-card`, `.chip`, ...)
- Original design reference: `docs/design-reference.html`
- Open work: `BUILD-TASKS.md`

## Content rules (from Raymond; keep these)
- No em dashes or en dashes in any visible text. Use commas, colons, full stops or parentheses. A test enforces this.
- Do not name employers or describe work history. Talk about technology, platforms and projects instead.
- No figures that go stale: no "16+ years", no years of experience, no "currently". Counts are rounded-down floors that stay true as they grow ("800,000+", "120,000+").
- No job-hunting status ("open to roles"), no citizenship or work-pass details, no LinkedIn or GitHub links. Email is the only contact.
- Only list tools Raymond has used hands-on and could discuss in an interview. No "exposure" markers.
- Tone: first person, plain and specific, not résumé-speak. Avoid buzzwords like "sovereign", "synergy", "mandates".
- Never invent metrics, latencies, ratings or user counts. If a number isn't real, leave it out.

## Design rules
- Light and dark themes (class strategy on `<html>`, system default, remembered in localStorage).
- Text contrast at least 4.5:1 in both themes; light-mode accent text uses `#C2410C`, dark uses `#FB923C`.
- Touch targets at least 44px. No horizontal scroll at 390px wide.
- Fonts are self-hosted with Fontsource (Plus Jakarta Sans, Newsreader italic, JetBrains Mono). Do not add Google Fonts links.

## Analytics
GA4 loads only when `PUBLIC_GA4_ID` is set. Links with `data-track` send GA4 events (`outbound`, `download`, `contact`).

## Git
Small, focused commits. Do not push directly to `main` without the CI passing locally (`npm run check && npm run build && npm test`).
