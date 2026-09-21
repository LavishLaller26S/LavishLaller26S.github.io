import { getCollection, type CollectionEntry } from 'astro:content';

type PostCollection = 'projects' | 'open-source' | 'research';

/** Prefix an internal path with the deploy base (works for user & project pages). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : '/' + path}` || '/';
}

/** Published entries, newest first. Drafts show only in `npm run dev`. */
export async function published<C extends PostCollection>(name: C) {
  const items = (await getCollection(name)) as CollectionEntry<C>[];
  return items
    .filter((e) => import.meta.env.DEV || !(e.data as { draft?: boolean }).draft)
    .sort((a, b) => +(b.data as { date: Date }).date - +(a.data as { date: Date }).date);
}

export function readingTime(body = ''): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
