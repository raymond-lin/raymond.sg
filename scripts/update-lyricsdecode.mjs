// Refreshes src/data/lyricsdecode.json: the number of song pages in Lyricsdecode's sitemap
// (https://lyricsdecode.com/songs/<slug>). Run weekly by .github/workflows/stats.yml, or
// locally with `npm run songs`. The card shows it as a rounded-down floor ("400+ songs explained")
// with "Last checked <date>".
//
// Rules:
// - A successful count updates the number and lastChecked, even when the number is the same.
// - If the sitemap can't be fetched, has no song pages, or the count drops by more than 10%
//   (likely a broken sitemap, not deleted songs), nothing is written and a warning is logged;
//   the workflow then opens the issue "Project stats need a look".
import { appendFile, readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/lyricsdecode.json', import.meta.url);
const warnings = [];
const warn = (msg) => {
  warnings.push(`Lyricsdecode: ${msg}`);
  console.log(`::warning::Lyricsdecode: ${msg}`);
};

const data = JSON.parse(await readFile(FILE, 'utf8'));

try {
  const res = await fetch(data.sitemapUrl, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; raymond.sg stats bot; +https://raymond.sg)' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const xml = await res.text();
  const songs = new Set([...xml.matchAll(/<loc>\s*https?:\/\/(?:www\.)?lyricsdecode\.com\/songs\/([^/<\s]+)\s*<\/loc>/g)].map((m) => m[1])).size;
  if (songs === 0) {
    warn('No song pages found in the sitemap; its format may have changed.');
  } else if (songs < data.songs * 0.9) {
    warn(`Song count fell from ${data.songs} to ${songs}; not updated in case the sitemap is broken. Update src/data/lyricsdecode.json by hand if it is right.`);
  } else {
    console.log(`Songs: ${data.songs} -> ${songs}`);
    data.songs = songs;
    data.lastChecked = new Date().toISOString().slice(0, 10);
    await writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`);
  }
} catch (e) {
  warn(`Sitemap fetch failed: ${e.message}`);
}

// In GitHub Actions, hand the warnings to the workflow, which opens an issue when there are any.
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `warnings=${warnings.length}\n`);
if (process.env.RUNNER_TEMP && warnings.length) {
  await appendFile(`${process.env.RUNNER_TEMP}/stats-warnings.md`, warnings.map((w) => `- ${w}`).join('\n') + '\n');
}
