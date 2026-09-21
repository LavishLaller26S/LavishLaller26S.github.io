import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// DEPLOY SETTINGS — change these two lines once.
//
// If your repo is named  <username>.github.io  → base: '/'
// If your repo has any other name, e.g. "portfolio" → base: '/portfolio'
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://lavishlaller26s.github.io',
  base: '/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
