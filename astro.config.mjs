// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://raymond.sg',
  trailingSlash: 'ignore',
  // Astro 7 defaults to JSX-style whitespace stripping; keep normal HTML spacing between inline text.
  compressHTML: true,
  integrations: [sitemap()],
});
