// The language list is the list of i18n files. Nothing else names a language.
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
const dir = join(dirname(fileURLToPath(import.meta.url)), "i18n");
export default readdirSync(dir).filter((f) => f.endsWith(".json")).sort().map((f) => {
  const t = JSON.parse(readFileSync(join(dir, f), "utf8"));
  return { lang: t.meta.lang, name: t.meta.name, t };
});
