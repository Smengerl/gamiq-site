// Key parity of all language files, like firmware/lang of the gamiq repository: same keys, same array lengths, no empty text.
import { readdirSync, readFileSync } from "node:fs";
const dir = "src/_data/i18n";
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const flat = (o, p = "", acc = {}) => {
  if (Array.isArray(o)) { acc[p + ".#"] = o.length; o.forEach((v, i) => flat(v, `${p}[${i}]`, acc)); }
  else if (o && typeof o === "object") for (const k of Object.keys(o)) flat(o[k], p ? `${p}.${k}` : k, acc);
  else acc[p] = o;
  return acc;
};
const all = Object.fromEntries(files.map((f) => [f, flat(JSON.parse(readFileSync(`${dir}/${f}`, "utf8")))]));
let bad = 0;
const ref = all[files[0]];
for (const f of files) {
  const m = all[f];
  for (const k of Object.keys(ref)) if (!(k in m)) { console.error(`${f}: missing ${k}`); bad++; }
  for (const k of Object.keys(m)) if (!(k in ref)) { console.error(`${f}: extra ${k}`); bad++; }
  for (const [k, v] of Object.entries(m)) if (v === "") { console.error(`${f}: empty ${k}`); bad++; }
}
console.log(bad ? `i18n: ${bad} problem(s)` : `i18n: ${files.length} languages, ${Object.keys(ref).length} keys, parity ok`);
process.exit(bad ? 1 : 0);
