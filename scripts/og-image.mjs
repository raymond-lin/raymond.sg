// Renders the Open Graph share image (public/og.png, 1200 × 630) with the site's own fonts and
// colours. Run with `npm run og` after changing the name, role or headline in src/data/site.ts.
// Uses the Playwright Chromium that the smoke tests already need.
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const font = async (pkg, file) =>
  (await readFile(new URL(`../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url))).toString('base64');
const sans = await font('plus-jakarta-sans', 'plus-jakarta-sans-latin-wght-normal.woff2');
const mono = await font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2');

const siteTs = await readFile(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const pick = (key) => siteTs.match(new RegExp(`${key}:\\s*'([^']+)'`))[1];
const name = pick('name');
const role = pick('role');
const headline = pick('ogDescription');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Sans; src: url(data:font/woff2;base64,${sans}) format('woff2'); font-weight: 200 800; }
@font-face { font-family: Mono; src: url(data:font/woff2;base64,${mono}) format('woff2'); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #FAF9F6; color: #1C1917; font-family: Sans; overflow: hidden; }
.frame { position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; }
.top { display: flex; align-items: center; gap: 20px; }
.mark { width: 64px; height: 64px; border-radius: 4px; background: #1C1917; color: #FAF9F6; display: flex; align-items: center; justify-content: center; font-family: Mono; font-weight: 700; font-size: 24px; letter-spacing: 0.04em; }
.name { font-size: 30px; font-weight: 600; letter-spacing: -0.01em; text-transform: uppercase; }
.role { margin-top: 4px; font-size: 16px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #C2410C; }
h1 { margin-top: auto; font-size: 68px; line-height: 1.06; font-weight: 500; letter-spacing: -0.035em; max-width: 1000px; text-wrap: balance; }
.foot { margin-top: 44px; padding-top: 22px; border-top: 1px solid #E7E5E4; display: flex; justify-content: space-between; font-size: 18px; letter-spacing: 0.18em; text-transform: uppercase; color: #6B6862; }
.foot b { font-family: Mono; font-weight: 600; letter-spacing: 0.02em; text-transform: none; font-size: 22px; color: #C2410C; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #EA580C; }
</style></head><body><div class="frame">
<div class="top"><div class="mark">RL</div><div><div class="name">${name}</div><div class="role">${role}</div></div></div>
<h1>${headline}</h1>
<div class="foot"><span>Singapore</span><b>raymond.sg</b></div>
</div><div class="bar"></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname });
await browser.close();
console.log('Wrote public/og.png');
