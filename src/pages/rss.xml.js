import rss from '@astrojs/rss';
import { site as cfg } from '../site.config';
import { published } from '../lib/utils';

export async function GET(context) {
  const S = cfg.sections;
  const items = [
    ...(S.work.enabled ? (await published('projects')).map((p) => ({ ...p, path: `/work/${p.id}/` })) : []),
    ...(S.openSource.enabled ? (await published('open-source')).map((p) => ({ ...p, path: `/open-source/${p.id}/` })) : []),
    ...(S.research.enabled ? (await published('research')).map((p) => ({ ...p, path: `/research/${p.id}/` })) : []),
  ].sort((a, b) => b.data.date - a.data.date);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: cfg.name,
    description: cfg.tagline,
    site: context.site,
    items: items.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `${base}${p.path}`,
    })),
  });
}
