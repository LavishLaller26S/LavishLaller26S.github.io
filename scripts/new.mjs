// Usage:  npm run new -- <project|oss|research|series> "Title of the thing"
// Creates a new draft Markdown file from the matching _template.md.
import fs from 'node:fs';
import path from 'node:path';

const map = { project: 'projects', oss: 'open-source', research: 'research', series: 'series' };
const [kind, ...rest] = process.argv.slice(2);
const title = rest.join(' ').trim();
if (!map[kind] || !title) {
  console.log('Usage: npm run new -- <project|oss|research|series> "Title"');
  process.exit(1);
}
const dir = path.join('src/content', map[kind]);
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) { console.error(`Already exists: ${file}`); process.exit(1); }

const today = new Date().toISOString().slice(0, 10);
let tpl = fs.readFileSync(path.join(dir, '_template.md'), 'utf8');
tpl = tpl
  .split('\n').filter((l) => !/^# (Copy|A series|Files starting|then add)/.test(l)).join('\n')
  .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
  .replace(/^date: .*$/m, `date: ${today}`);
fs.writeFileSync(file, tpl);
console.log(`Created ${file}  (draft: true — flip to false when it's ready)`);
