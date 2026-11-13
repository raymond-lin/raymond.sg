import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      category: z.string(), // e.g. "Calculator", shown as "01 / Calculator"
      platform: z.string(), // e.g. "Web app", "Chrome + Firefox"
      summary: z.string(),
      specs: z.array(z.object({ label: z.string(), value: z.string() })),
      stackLine: z.string(),
      screenshot: image().optional(), // local file in src/assets/projects
      screenshotUrl: z.string().url().optional(), // remote fallback until self-hosted
      screenshotAlt: z.string(),
      screenshotFit: z.enum(['cover', 'contain']).default('cover'),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      cnet: z.boolean().default(false), // pull downloads and ranking from src/data/cnet.json
      link: z.object({ label: z.string(), href: z.string() }).optional(),
      linkNote: z.string().optional(), // shown when there is no link, e.g. "Case study soon"
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
