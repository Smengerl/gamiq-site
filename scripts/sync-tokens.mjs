// Copies the :root token block of the phone page into src/css/tokens.css. The font-face of that file is a digits-only subset and stays behind.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
const repo = resolve(process.env.GAMIQ_REPO || "../gamiq");
if (!existsSync(`${repo}/platform/frontend/tokens.css`)) {
	console.error(`Cannot sync tokens: ${repo}/platform/frontend/tokens.css does not exist.\nCheck out the gamiq repository at ../gamiq or set GAMIQ_REPO to its path.`);
	process.exit(1);
}
const src = readFileSync(`${repo}/platform/frontend/tokens.css`, "utf8");
const start = src.indexOf(":root {");
const lastToken = src.indexOf("--bubble-shadow", start);
const end = lastToken < 0 ? -1 : src.indexOf("}", lastToken);
if (start < 0 || lastToken < 0 || end < 0) {
	console.error(`Cannot sync tokens: ${repo}/platform/frontend/tokens.css has an unexpected format.`);
	process.exit(1);
}
const block = src.slice(start, end + 1);
let sha;
try {
	sha = execFileSync("git", ["-C", repo, "rev-parse", "--short", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
} catch {
	console.error(`Cannot sync tokens: ${repo} is not a readable git checkout, or git is unavailable.`);
	process.exit(1);
}
writeFileSync("src/css/tokens.css", `/* Synced from gamiq platform/frontend/tokens.css at ${sha} by scripts/sync-tokens.mjs. Do not edit. */\n${block}\n`);
console.log("tokens synced from", sha);
