// ═══════════════════════════════════════════════════════════════
//  SITE CONFIG — the one file you edit to change who you are,
//  your links, and which sections exist.
//  Posts and projects live as Markdown files in src/content/.
// ═══════════════════════════════════════════════════════════════

export const site = {
  name: 'Lavish Laller',
  shortName: 'Lavish Laller',
  tagline: 'Software engineer. Rust, Java , systems, and Backends',

  // Shown on the home page under your name. One paragraph per string.
  intro: [
    'I build software close to the machine. Most of my recent work has been in Rust, on on-device AI and edge systems.',
    'And Currently I am working on Java with SpringBoot Framework.',
    'This site is where I show what I build, what I contribute to open source, and how I think through problems before I write code.',
  ],

  location: 'New Delhi, India',
  timezone: 'IST (UTC+5:30)',

  // Put a square photo at public/avatar.jpg and set this to '/avatar.jpg'.
  // Leave it as '' to show your initials instead.
  avatar: 'public/avatar.png',

  // Remote-job availability banner on the home page. Set `open: false` to hide it.
  availability: {
    open: true,
    text: 'Open to remote software engineering roles. Available to join immediately.',
  },

  // Put your resume at public/resume.pdf. Leave '' to hide the button.
  resume: 'public/resume.pdf',

  // Contact + social links. Leave any value as '' to hide it.
  links: {
    email: 'lallerlavish2023@gmail.com',
    github: 'https://github.com/LavishLaller26S',
    linkedin: 'https://www.linkedin.com/in/lavish-laller-650453362/',
    x: 'https://x.com/lallerlavish',
  },

  // Optional contact form. Create a free form at https://formspree.io,
  // paste its endpoint here (looks like https://formspree.io/f/abcdwxyz).
  // Leave '' to show only the email/social links.
  contactForm: '',

  // ─── Sections ────────────────────────────────────────────────
  // enabled: false  → hidden from the nav, the home page and the build.
  // Order here = order in the nav. (Home page order: see CUSTOMIZING.md §6.)
  sections: {
    work:       { enabled: true, title: 'My Work',     path: '/work',        blurb: 'Things I have built, and what changed along the way.' },
    openSource: { enabled: true, title: 'Open Source', path: '/open-source', blurb: 'Contributions to other people\'s projects: the bug, the fix, what I learned.' },
    research:   { enabled: true, title: 'Research',    path: '/research',    blurb: 'Long-form notes on technology and on the approach behind my work.' },
    series:     { enabled: true, title: 'Series',      path: '/series',      blurb: 'Multi-part arcs, in order.' },
    about:      { enabled: true, title: 'About',       path: '/about',       blurb: '' },
  },

  // How many items each section shows on the home page.
  homeLimit: 3,

  footerNote: 'Views are my own.',
};

export type SectionKey = keyof typeof site.sections;
