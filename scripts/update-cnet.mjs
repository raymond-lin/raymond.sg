// Refreshes src/data/cnet.json from CNET Download: total downloads (product page) and
// rank within the File Management category (category page). Run weekly by
// .github/workflows/cnet-stats.yml, or locally with `npm run cnet`.
//
// Rules:
// - Downloads only ever go up; a lower or unparseable number is ignored.
// - If the product is not found in the category list, categoryRank becomes null,
//   which hides the "Top 3" badge on the site.
// - If CNET blocks the request or the page layout changes, nothing is written and
//   the workflow logs a warning, so the site keeps its last known values.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/cnet.json', import.meta.url);
const PRODUCT_ID = '10911445';
const HEADERS = {
  'user-agent': 'Mozilla/5.0 (compatible; raymond.sg stats bot; +https://raymond.sg)',
  'accept-language': 'en-US,en;q=0.9',
};

const warn = (msg) => console.log(`::warning::${msg}`);

async function get(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

function parseTotalDownloads(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const m = text.match(/Total Downloads\s*:?\s*([\d,]{3,})/i);
  return m ? Number(m[1].replace(/,/g, '')) : null;
}

function parseRank(html) {
  // Product links on CNET look like /<slug>/3000-2092_4-<id>.html; take them in page order.
  const ids = [];
  for (const m of html.matchAll(/\/3000-\d+_4-(\d+)\.html/g)) if (!ids.includes(m[1])) ids.push(m[1]);
  if (ids.length === 0) return undefined; // layout changed: unknown
  const i = ids.indexOf(PRODUCT_ID);
  return i === -1 ? null : i + 1;
}

const data = JSON.parse(await readFile(FILE, 'utf8'));
let changed = false;

try {
  const total = parseTotalDownloads(await get(data.productUrl));
  if (total && total > data.cnetTotalDownloads) {
    console.log(`Total downloads: ${data.cnetTotalDownloads} -> ${total}`);
    data.cnetTotalDownloads = total;
    changed = true;
  } else if (!total) warn('Could not read Total Downloads from the CNET product page.');
} catch (e) {
  warn(`Product page fetch failed: ${e.message}`);
}

try {
  const rank = parseRank(await get(data.categoryUrl));
  if (rank === undefined) {
    warn('Could not find any product links on the CNET category page; layout may have changed.');
  } else {
    console.log(`Category rank: ${data.categoryRank} -> ${rank}`);
    data.categoryRank = rank;
    data.lastChecked = new Date().toISOString().slice(0, 10);
    changed = true;
  }
} catch (e) {
  warn(`Category page fetch failed: ${e.message}`);
}

if (changed) {
  await writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`);
  console.log('Updated src/data/cnet.json');
} else {
  console.log('No updates written.');
}
