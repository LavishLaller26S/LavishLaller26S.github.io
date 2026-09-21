# Customizing your site — the complete guide

This file explains **how to change anything on the site**, from fixing a typo to adding a
whole new section. Keep it in the repo; it's your manual.

> **Golden rule:** you never edit the live website directly. You edit files on your laptop,
> check them locally, then `git push`. GitHub rebuilds the site in about a minute.
> That's also why no visitor can change anything: only your pushes update the site.

---

## Contents

1. [Which file changes what](#1-which-file-changes-what)
2. [Everyday workflow](#2-everyday-workflow)
3. [Your personal info and links](#3-your-personal-info-and-links)
4. [Photo, resume and favicon](#4-photo-resume-and-favicon)
5. [Writing content (projects, open source, research)](#5-writing-content)
6. [The home page](#6-the-home-page)
7. [Series (multi-part posts)](#7-series-multi-part-posts)
8. [Showing, hiding and renaming sections](#8-showing-hiding-and-renaming-sections)
9. [Adding a brand-new section](#9-adding-a-brand-new-section)
10. [Deleting a section for good](#10-deleting-a-section-for-good)
11. [Navigation bar and footer](#11-navigation-bar-and-footer)
12. [Colours, fonts and layout](#12-colours-fonts-and-layout)
13. [About page and contact form](#13-about-page-and-contact-form)
14. [Deploying, repo name and custom domain](#14-deploying-repo-name-and-custom-domain)
15. [Keeping it locked down](#15-keeping-it-locked-down)
16. [Troubleshooting](#16-troubleshooting)
17. [Full file map](#17-full-file-map)

---

## 1. Which file changes what

| I want to change… | Edit this file |
|---|---|
| Name, tagline, intro text, email/GitHub/LinkedIn, "open to work" banner | `src/site.config.ts` |
| Turn a section on/off, rename it in the menu | `src/site.config.ts` → `sections` |
| About page text (experience, skills, education) | `src/about.md` |
| Add/edit a project | `src/content/projects/<name>.md` |
| Add/edit an open-source post | `src/content/open-source/<name>.md` |
| Add/edit a research post | `src/content/research/<name>.md` |
| Create a series | `src/content/series/<name>.md` |
| Colours, fonts, spacing | `src/styles/global.css` (top of file) |
| Order of sections on the home page | `src/pages/index.astro` |
| Menu bar (extra links, "Hire me" button) | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` + `footerNote` in config |
| Photo, resume PDF, images, favicon | `public/` folder |
| Website address (`site`, `base`) | `astro.config.mjs` |
| Auto-deploy settings | `.github/workflows/deploy.yml` (normally never touch) |

---

## 2. Everyday workflow

**One-time setup on a new laptop:** install [Node.js 22+](https://nodejs.org), clone the repo, then:

```bash
npm install
```

**Every time you change something:**

```bash
npm run dev            # 1. open http://localhost:4321 — page reloads as you save
                       # 2. edit files, check them in the browser
npm run build          # 3. (optional) make sure the full build passes
git add .
git commit -m "describe what you changed"
git push               # 4. live in ~1 minute
```

- `npm run dev` shows **drafts** too. The live site never shows drafts.
- If `npm run build` fails on your laptop, it will fail on GitHub too. Fix it before pushing (see [§16](#16-troubleshooting)).
- Check progress on GitHub → your repo → **Actions** tab. Green tick = live.

---

## 3. Your personal info and links

Open `src/site.config.ts`. Every field has a comment. The main ones:

| Field | What it does | Example |
|---|---|---|
| `name` | Big heading on home page, page titles, footer | `'Lavish Laller'` |
| `shortName` | Top-left of the menu bar | `'Lavish Laller'` |
| `tagline` | Line under your name; also the Google/LinkedIn preview text | `'Software engineer. Rust, systems…'` |
| `intro` | Paragraphs on the home page. One string per paragraph. | `['First para.', 'Second para.']` |
| `location`, `timezone` | Shown in the Contact box on About | `'Noida, India'` |
| `avatar` | Path to your photo, or `''` for initials | `'/avatar.jpg'` |
| `availability.open` | `true` shows the green "open to work" banner; `false` hides it everywhere | `true` |
| `availability.text` | Banner text | `'Open to remote roles…'` |
| `resume` | Path to resume PDF, or `''` to hide Resume buttons | `'/resume.pdf'` |
| `links.email` / `github` / `linkedin` / `x` | Contact links. `''` hides that link. | `'https://linkedin.com/in/…'` |
| `contactForm` | Formspree URL for a message form, or `''` for none (see [§13](#13-about-page-and-contact-form)) | `''` |
| `homeLimit` | How many items each section shows on the home page | `3` |
| `footerNote` | Small line in the footer | `'Views are my own.'` |

> ⚠️ Keep the quotes and commas. `name: 'Lavish'` is fine; `name: Lavish` breaks the build.
> If a text contains an apostrophe, escape it: `'I\'m open to work'`, or use double quotes: `"I'm open to work"`.

---

## 4. Photo, resume and favicon

Everything in `public/` is copied to the site as-is.

| Thing | Do this |
|---|---|
| **Photo** | Put a square image at `public/avatar.jpg` (≈400×400 px). Set `avatar: '/avatar.jpg'`. |
| **Resume** | Put it at `public/resume.pdf`. Set `resume: '/resume.pdf'`. To update it later, just replace the file and push. |
| **Favicon** (browser-tab icon) | Replace `public/favicon.svg`. To use a PNG instead, add `public/favicon.png` and change the `<link rel="icon">` line in `src/layouts/Base.astro`. |
| **Images for posts** | Put them in `public/images/…` and use them in Markdown as `![Alt text](/images/diagram.png)`. |

---

## 5. Writing content

### 5.1 Create a new entry

The fastest way:

```bash
npm run new -- project  "Papermind"
npm run new -- oss      "Fixing a timer race in Tokio"
npm run new -- research "Why RAG fails on tables"
```

This copies the folder's `_template.md` into a new file (e.g. `src/content/research/why-rag-fails-on-tables.md`),
fills in the title and today's date, and marks it as a **draft**.

You can also do it by hand: copy `_template.md`, rename it, and edit it.

- **The file name becomes the URL.** `why-rag-fails-on-tables.md` → `/research/why-rag-fails-on-tables/`.
  Use lowercase and dashes, no spaces.
- Files starting with `_` are **never published** (that's how the templates stay hidden).

### 5.2 The front matter (the part between `---` lines)

Every file starts with settings between two `---` lines, then the body in Markdown.

**Projects** (`src/content/projects/`)

| Field | Required | Meaning |
|---|---|---|
| `title` | ✅ | Project name |
| `summary` | ✅ | 1–2 sentences shown on cards |
| `date` | ✅ | `YYYY-MM-DD`. When you started, or the last big update. Sorts newest first. |
| `status` | | `idea`, `building`, `shipped`, `paused` or `archived` (default `building`) |
| `stack` | | `[Rust, Axum, PostgreSQL]`. Shown as small tags. |
| `repo` | | GitHub link. Shows a "Source code" button. |
| `demo` | | Live link. Shows a "Live demo" button. |
| `featured` | | `true` pins it to the top of the lists |
| `draft` | | `true` hides it from the live site |

**Open source** (`src/content/open-source/`)

| Field | Required | Meaning |
|---|---|---|
| `title`, `summary`, `date` | ✅ | As above |
| `project` | | Which project you contributed to, e.g. `tokio-rs/tokio` |
| `prUrl` | | Link to the pull request. Shows a "View pull request" button. |
| `prStatus` | | `merged`, `open` or `closed` |
| `tags` | | `[rust, async]` |
| `series`, `seriesOrder` | | See [§7](#7-series-multi-part-posts) |
| `draft` | | `true` hides it |

**Research** (`src/content/research/`)

| Field | Required | Meaning |
|---|---|---|
| `title`, `summary`, `date` | ✅ | As above |
| `tags` | | `[systems, rag]` |
| `series`, `seriesOrder` | | See [§7](#7-series-multi-part-posts) |
| `draft` | | `true` hides it |

Reading time ("5 min") is calculated automatically.

### 5.3 Markdown cheat-sheet for the body

````markdown
## Section heading
### Smaller heading

Normal paragraph with **bold**, *italic*, `inline code` and a [link](https://example.com).

- bullet
- bullet

1. numbered
2. numbered

> A quote or callout.

![Architecture diagram](/images/papermind-arch.png)

```rust
fn main() {
    println!("code blocks get syntax highlighting");
}
```

| Column | Column |
|---|---|
| cell | cell |

---   ← horizontal line
````

### 5.4 Updating, hiding, deleting

| Action | How |
|---|---|
| Update a post or project | Edit its file and push. For projects, add a dated line under `## Changelog`. |
| Hide temporarily | Set `draft: true` |
| Delete permanently | Delete the file |
| Rename the URL | Rename the file. **Old links will break**, so avoid renaming anything you've already shared. |

---

## 6. The home page

File: `src/pages/index.astro`.

| Change | How |
|---|---|
| Intro paragraphs | `intro` in `site.config.ts` |
| Green "open to work" banner | `availability` in `site.config.ts` |
| Number of items per section | `homeLimit` in `site.config.ts` |
| "Coming soon" texts | Search for `<Empty text="…" />` in `index.astro` and change the text |
| **Order of sections** | In `index.astro`, each section is a block starting with `{S.work.enabled && (`, `{S.openSource.enabled && (`, and so on. Cut a whole block (from `{S.xxx.enabled && (` to its matching `)}`) and paste it where you want it. |
| Hide a section only on the home page (keep its page) | Delete or comment out that block in `index.astro`. To comment out in Astro, wrap it in `{/* … */}`. |

The **Series** block only appears on the home page once at least one series exists.

---

## 7. Series (multi-part posts)

A series groups several open-source or research posts in order, like "Part 1 of 4".

1. Create the series:
   ```bash
   npm run new -- series "Rust from scratch"
   ```
   This makes `src/content/series/rust-from-scratch.md`. Fill in `description`.
   `order` controls where it appears on the Series page (lower number = higher up).
2. In each post that belongs to it, add:
   ```yaml
   series: rust-from-scratch   # the series FILE NAME, without .md
   seriesOrder: 1              # 1, 2, 3…
   ```
3. Done. The posts show "Rust from scratch · Part 1 of 3" and Previous/Next buttons,
   and the Series page lists the parts in order.

---

## 8. Showing, hiding and renaming sections

All in `src/site.config.ts` → `sections`:

```ts
sections: {
  work:       { enabled: true, title: 'My Work',     path: '/work',        blurb: '…' },
  openSource: { enabled: true, title: 'Open Source', path: '/open-source', blurb: '…' },
  research:   { enabled: true, title: 'Research',    path: '/research',    blurb: '…' },
  series:     { enabled: true, title: 'Series',      path: '/series',      blurb: '…' },
  about:      { enabled: true, title: 'About',       path: '/about',       blurb: '' },
},
```

| Change | How |
|---|---|
| **Hide** a section everywhere (menu, home, its pages) | `enabled: false`. Its content files stay safe; flip back to `true` any time. |
| **Rename** it in the menu and headings | Change `title`, e.g. `'Projects'` instead of `'My Work'` |
| Change its subtitle | Change `blurb` |
| **Reorder the menu** | Reorder the lines |
| **Change the URL** (e.g. `/work` → `/projects`) | Two steps: change `path: '/projects'` **and** rename the folder `src/pages/work/` → `src/pages/projects/`. Then search the code for the old path (`/work/`) and replace it, mainly in `src/pages/index.astro`, `src/components/ProjectCard.astro` and `src/pages/rss.xml.js`. |

---

## 9. Adding a brand-new section

Example: a **Talks** section. It's the same shape as Research, so we copy Research.
Replace `talks` / `Talks` with your own name.

**Step 1: register the content type.** In `src/content.config.ts`, add below `research`:

```ts
const talks = defineCollection({
  loader: glob({ pattern, base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // add any extra fields you want, e.g.:
    // event: z.string().optional(),
    // slides: z.string().optional(),
  }),
});
```

and add it to the export on the last line:

```ts
export const collections = { projects, 'open-source': openSource, research, series, talks };
```

**Step 2: allow the helper to read it.** In `src/lib/utils.ts`, change the first type line to:

```ts
type PostCollection = 'projects' | 'open-source' | 'research' | 'talks';
```

**Step 3: create the content folder.**

```bash
mkdir src/content/talks
cp src/content/research/_template.md src/content/talks/_template.md
```

**Step 4: create the pages.** Copy the Research pages:

```bash
cp -r src/pages/research src/pages/talks
```

In **both** new files (`src/pages/talks/index.astro` and `src/pages/talks/[id].astro`):

- replace `'research'` with `'talks'`
- replace `/research/` with `/talks/`
- replace `sections.research` with `sections.talks`

**Step 5: add it to the config.** In `src/site.config.ts` → `sections`:

```ts
talks: { enabled: true, title: 'Talks', path: '/talks', blurb: 'Conference and meetup talks.' },
```

It now appears in the menu automatically.

**Step 6 (optional): show it on the home page.** In `src/pages/index.astro`:

- near the top, next to `const research = …`, add:
  ```ts
  const talks = (await published('talks')).slice(0, n);
  ```
- copy the whole `{S.research.enabled && ( … )}` block and change `research` → `talks`, `S.research` → `S.talks`.

**Step 7 (optional): include it in RSS.** In `src/pages/rss.xml.js`, copy the `research` line and change it to `talks`.

**Step 8 (optional): support `npm run new -- talk "…"`.** In `scripts/new.mjs`, add `talk: 'talks'` to the `map` object.

Run `npm run dev` and open `/talks`. Done.

> **A simple page with no posts** (e.g. "Uses" or "Now")? Much easier. Create `src/pages/uses.md`:
> ```markdown
> ---
> layout: ../layouts/Simple.astro
> title: Uses
> ---
> My setup: …
> ```
> This uses the included `src/layouts/Simple.astro`. Then add
> `uses: { enabled: true, title: 'Uses', path: '/uses', blurb: '' }` to `sections` to put it in the menu.

---

## 10. Deleting a section for good

Setting `enabled: false` is usually enough. To remove it completely (e.g. Series):

1. Delete `src/pages/series/` and `src/content/series/`.
2. Remove the `series` line from `sections` in `site.config.ts`.
3. Remove `series` from `collections` in `src/content.config.ts`.
4. Remove the `{S.series.enabled && …}` block and `const series = …` from `src/pages/index.astro`.
5. Run `npm run build`. Any error message points to a leftover reference; delete it.

---

## 11. Navigation bar and footer

**Menu** (`src/components/Header.astro`): sections from the config appear automatically.

- **Remove the RSS link:** delete the line `<a href={url('/rss.xml')}>RSS</a>`.
- **Change the "Hire me" button:** edit the `<a class="btn primary hire" …>Hire me</a>` line (text or link), or delete it.
- **Add an external link** (e.g. your blog on another site): add
  `<a href="https://example.com">Blog</a>` inside `<nav>`.

**Footer** (`src/components/Footer.astro`): links come from `links` in the config, and the small line from `footerNote`.

---

## 12. Colours, fonts and layout

All design settings are at the **top of `src/styles/global.css`**:

| Token | Used for | Current |
|---|---|---|
| `--bg` | Page background | `#0c0e0d` (near-black) |
| `--surface` | Card hover, code background | `#111413` |
| `--border`, `--border-strong` | Card and line borders | `#222826`, `#2e3632` |
| `--text` | Main text | `#e8ebe9` |
| `--muted`, `--faint` | Secondary text, dates | `#9aa39e`, `#6c7570` |
| `--green` | Buttons, banner border | `#1f6b46` (dark green) |
| `--green-hover` | Button hover | `#25804f` |
| `--green-text` | Links and small highlights | `#5cc28b` |
| `--green-soft` | Banner and badge background | translucent green |
| `--max` | Width of the text column | `46rem` |
| `--radius` | Card corner roundness | `12px` |
| `--font`, `--mono` | Main font, code font | system fonts |

Change a value, save, and the whole site updates. Keep `--text` and link colours bright enough to read on black.

**Use a Google Font** (e.g. Inter):

1. In `src/layouts/Base.astro`, inside `<head>`, add:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
   ```
2. In `global.css`, set `--font: "Inter", -apple-system, sans-serif;`

**Code-block colour theme:** in `astro.config.mjs`, change `theme: 'github-dark-dimmed'` to another
[Shiki theme](https://shiki.style/themes), e.g. `'vitesse-dark'` or `'one-dark-pro'`.

**Styles for one page only** live in the `<style>` block at the bottom of that page's `.astro` file.

---

## 13. About page and contact form

**About text:** edit `src/about.md` like any Markdown. The **Contact** box below it is built from the config (email, links, resume, availability).

> A line break inside a paragraph needs **two spaces at the end of the line**, or leave a blank line to start a new paragraph.

**Contact form (optional, free).** Messages go to your email; nothing is stored on the site.

1. Sign up at [formspree.io](https://formspree.io) and create a form.
2. Copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `contactForm: '…'` in `site.config.ts` and push.

A form with "Your email", "Message" and "Send" appears on the About page. Set it back to `''` to remove it.

---

## 14. Deploying, repo name and custom domain

**First deploy:** see `README.md`. In short: repo named `<username>.github.io`, then
Settings → Pages → Source: **GitHub Actions**.

**`astro.config.mjs` settings:**

| Your setup | `site` | `base` |
|---|---|---|
| Repo named `lavish.github.io` | `'https://lavish.github.io'` | `'/'` |
| Repo named `portfolio` | `'https://lavish.github.io'` | `'/portfolio'` |
| Custom domain `lavish.dev` | `'https://lavish.dev'` | `'/'` |

**Custom domain** (optional, bought from Namecheap, GoDaddy, Cloudflare, etc.):

1. Create `public/CNAME` containing just your domain, e.g. `lavishlaller.dev`.
2. Set `site: 'https://lavishlaller.dev'` and `base: '/'`.
3. At your domain provider, add DNS records:
   - four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` → `<username>.github.io`
4. GitHub → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS** (may take a few hours to be offered).

---

## 15. Keeping it locked down

- The site is static: no login, database or admin page, so visitors can only read and contact you.
- Don't add collaborators (Settings → Collaborators).
- Settings → Branches → add a rule for `main`: block force pushes.
- Turn on 2FA for your GitHub account. Your account is the only key.
- Never put passwords or API keys in the repo. Everything in it is public.

---

## 16. Troubleshooting

| Problem | Cause and fix |
|---|---|
| Warning: `The collection "…" does not exist or is empty` | Normal. It just means that section has no published posts yet. Ignore it. |
| Build error mentioning `InvalidContentEntryDataError` or a field name | A front-matter field is wrong or missing. The message names the file and field. Common ones: missing `summary`, date not in `YYYY-MM-DD` form, `status` not one of the allowed words, list written without `[ ]`. |
| Post doesn't appear on the live site | It still has `draft: true`, or its file name starts with `_`. |
| Post appears but in the wrong place | Check its `date`. Lists sort newest first. |
| Site looks unstyled or links 404 after deploy | `site`/`base` in `astro.config.mjs` don't match your repo name (see [§14](#14-deploying-repo-name-and-custom-domain)). |
| GitHub Actions is red | Open the failed run → read the red step. Usually the same error `npm run build` shows locally. |
| Actions is green but the site is old | Hard-refresh (Ctrl/Cmd + Shift + R). Pages can cache for a few minutes. |
| `npm run dev` says a command isn't found | Run `npm install` first. |
| A change in `site.config.ts` broke everything | Usually a missing quote or comma. Check the line the error mentions. |
| Something is wrong and you want the last working version back | `git log` to find the last good commit, then `git revert <commit-id>` and push. |

---

## 17. Full file map

```
.
├── astro.config.mjs          site URL, base path, code theme
├── package.json              scripts: dev, build, preview, new
├── README.md                 setup + first deploy
├── CUSTOMIZING.md            this guide
├── .github/workflows/
│   └── deploy.yml            auto-deploy to GitHub Pages on push
├── public/                   copied as-is: favicon, avatar, resume, images, CNAME
├── scripts/
│   └── new.mjs               `npm run new` helper
└── src/
    ├── site.config.ts        ★ your info, links, sections on/off
    ├── about.md              ★ About page text
    ├── content.config.ts     content types and their fields
    ├── content/              ★ your writing
    │   ├── projects/
    │   ├── open-source/
    │   ├── research/
    │   └── series/
    ├── styles/global.css     ★ colours, fonts, shared styles
    ├── layouts/
    │   ├── Base.astro        <head>, menu, footer wrapper for every page
    │   ├── Post.astro        layout for a single post/project
    │   └── Simple.astro      layout for simple Markdown pages
    ├── components/
    │   ├── Header.astro      menu bar
    │   ├── Footer.astro      footer
    │   ├── PostRow.astro     one row in a post list
    │   ├── ProjectCard.astro one project card
    │   └── Empty.astro       "coming soon" box
    ├── lib/
    │   ├── utils.ts          dates, reading time, base-path links
    │   └── series.ts         groups posts into series
    └── pages/                one file/folder = one URL
        ├── index.astro       home page
        ├── about.astro       /about
        ├── work/             /work and /work/<project>
        ├── open-source/      /open-source and /open-source/<post>
        ├── research/         /research and /research/<post>
        ├── series/           /series
        ├── rss.xml.js        /rss.xml
        └── 404.astro         not-found page
```

★ = files you'll edit regularly. Everything else you'll rarely touch.
