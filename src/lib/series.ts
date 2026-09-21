import { getCollection } from 'astro:content';
import { published } from './utils';

export type SeriesPart = { title: string; href: string; order: number; date: Date };

/** All series with their published parts, in order. */
export async function allSeries() {
  const defs = (await getCollection('series')).sort((a, b) => a.data.order - b.data.order);
  const posts = [
    ...(await published('open-source')).map((p) => ({ p, base: '/open-source' })),
    ...(await published('research')).map((p) => ({ p, base: '/research' })),
  ];
  return defs.map((s) => {
    const parts: SeriesPart[] = posts
      .filter(({ p }) => p.data.series === s.id)
      .map(({ p, base }) => ({ title: p.data.title, href: `${base}/${p.id}/`, order: p.data.seriesOrder ?? 999, date: p.data.date }))
      .sort((a, b) => a.order - b.order || +a.date - +b.date);
    return { id: s.id, ...s.data, parts };
  });
}
