// Copies the :root token block of the phone page into src/css/tokens.css. The font-face of that file is a digits-only subset and stays behind.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
const repo = resolve(process.env.GAMIQ_REPO || "../gamiq");
const src = readFileSync(`${repo}/platform/frontend/tokens.css`, "utf8");
const block = src.slice(src.indexOf(":root {"), src.indexOf("}", src.indexOf("--bubble-shadow")) + 1);
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
writeFileSync("src/css/tokens.css", `/* Synced from gamiq platform/frontend/tokens.css at ${sha} by scripts/sync-tokens.mjs. Do not edit. */\n${block}\n`);
console.log("tokens synced from", sha);
