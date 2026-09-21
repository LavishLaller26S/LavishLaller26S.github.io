# Lavish Laller — personal site

Static site built with [Astro](https://astro.build), deployed to GitHub Pages.
Visitors can only read and contact. Only you can change it, by pushing to this repo.

📘 **Full editing guide: [CUSTOMIZING.md](CUSTOMIZING.md)**

## Run it locally

```bash
npm install
npm run dev          # http://localhost:4321  (drafts are visible here)
```

## Where things live

| What | Where |
|---|---|
| Name, tagline, intro, links, availability, **sections on/off** | `src/site.config.ts` |
| About page text | `src/about.md` |
| Projects ("My Work") | `src/content/projects/*.md` |
| Open-source posts | `src/content/open-source/*.md` |
| Research posts | `src/content/research/*.md` |
| Series definitions | `src/content/series/*.md` |
| Colours / fonts | top of `src/styles/global.css` |
| Photo, resume | `public/avatar.jpg`, `public/resume.pdf` (then set them in the config) |

## Add content

```bash
npm run new -- project  "Papermind"
npm run new -- oss      "Fixing a timer race in Tokio"
npm run new -- research "Why RAG fails on tables"
npm run new -- series   "Rust from scratch"
```

Each command creates a **draft** from that folder's `_template.md`. Write it, set `draft: false`, then:

```bash
git add . && git commit -m "new post" && git push
```

The site rebuilds and goes live in about a minute.

* To **update a project**, edit its file and add a line under `## Changelog`.
* To **remove** anything, delete its file (or set `draft: true` to hide it).
* To put a post in a **series**, add `series: <series-file-name>` and `seriesOrder: 1` to its front matter.
* To **hide a whole section**, set `enabled: false` in `site.config.ts`.

**Want to change anything else?** See [CUSTOMIZING.md](CUSTOMIZING.md), the full guide to every setting, file and section.

## First-time deploy

1. Create a repo on GitHub named **`<your-username>.github.io`**.
2. In `astro.config.mjs`, set `site: 'https://<your-username>.github.io'` (keep `base: '/'`).
   *(If you use a different repo name like `portfolio`, set `base: '/portfolio'`.)*
3. Push this folder:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Watch the **Actions** tab. When it's green, the site is live at `https://<your-username>.github.io`.

## Keep it locked down

* Don't add collaborators to the repo.
* **Settings → Branches → Add rule** for `main`: require pull requests and block force pushes.
* Turn on two-factor authentication on your GitHub account.
