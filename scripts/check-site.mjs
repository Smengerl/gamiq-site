// Checks of the build: internal links resolve, images exist, every page has lang and one h1, size budget of the page without images.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
const root = "_site";
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && pages.push(p); } };
walk(root);
let bad = 0;
const err = (m) => { console.error(m); bad++; };
for (const p of pages) {
  const h = readFileSync(p, "utf8");
  if (!/<html lang="[a-z]{2}"/.test(h)) err(`${p}: no lang`);
  if (p !== join(root, "index.html") && (h.match(/<h1[ >]/g) || []).length !== 1) err(`${p}: needs exactly one h1`);
  for (const m of h.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:)/.test(u)) continue;
    let t = resolve(dirname(p), u);
    if (existsSync(t) && statSync(t).isDirectory()) t = join(t, "index.html");
    if (!existsSync(t)) err(`${p}: broken link ${u}`);
  }
  const kb = Buffer.byteLength(h) / 1024;
  if (kb > 100) err(`${p}: ${kb.toFixed(0)} KB of HTML, budget 100`);
}
console.log(bad ? `site: ${bad} problem(s)` : `site: ${pages.length} pages ok`);
process.exit(bad ? 1 : 0);
