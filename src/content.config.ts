import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Files starting with "_" (like _template.md) are ignored — copy them to start a new entry.
const pattern = '**/[^_]*.{md,mdx}';

const seriesFields = {
  series: z.string().optional(),       // slug of a file in src/content/series/
  seriesOrder: z.number().optional(),  // 1, 2, 3 … position inside that series
};

const projects = defineCollection({
  loader: glob({ pattern, base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),                       // when you started / last major update
    status: z.enum(['idea', 'building', 'shipped', 'paused', 'archived']).default('building'),
    stack: z.array(z.string()).default([]),
    repo: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),        // pinned to top of the home page list
    draft: z.boolean().default(false),
  }),
});

const openSource = defineCollection({
  loader: glob({ pattern, base: './src/content/open-source' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(),             // e.g. "tokio", "rust-lang/rust"
    prUrl: z.string().optional(),
    prStatus: z.enum(['merged', 'open', 'closed']).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ...seriesFields,
  }),
});

const research = defineCollection({
  loader: glob({ pattern, base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ...seriesFields,
  }),
});

const series = defineCollection({
  loader: glob({ pattern, base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),                // sort order on the Series page
  }),
});

export const collections = { projects, 'open-source': openSource, research, series };
