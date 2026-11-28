// Copies panel renders and phone screenshots from the gamiq repository and makes web photos. Originals stay there.
// tablet_mini.png and tablet_midi.png in src/assets/phone are not copied from there: they are the real page at 820 px width (all parts side by side), cropped, kept in this repository.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
const repo = resolve(process.env.GAMIQ_REPO || "../gamiq");
const out = "src/assets";
const bb = "games/basketball/golden/red-de", cc = "games/colourcycle/golden/red-de", tb = "games/timebar/golden/red-de", iv = "games/intervaltimer/golden/red-de";
const panels = {
  shot_ready: `${bb}/run_24.png`, shot_run: `${bb}/run_13.png`, shot_expired: `${bb}/expired_lit.png`,
  clock_ready: `${bb}/clock_ready.png`, clock_run: `${bb}/clock_running_home.png`, clock_last: `${bb}/clock_last_5s.png`,
  clock_end: `${bb}/clock_period_end.png`, clock_ot: `${bb}/clock_overtime.png`,
  score: `${bb}/score_game.png`, score_rise: `${bb}/score_rise.png`, home: `${bb}/score_single_home.png`, guest: `${bb}/score_single_guest.png`,
  cc1: `${cc}/cc_five_lane1.png`, cc2: `${cc}/cc_five_lane2.png`, cc3: `${cc}/cc_five_lane3.png`, cc_big: `${cc}/cc_run_big.png`,
  tb_timer: `${tb}/tb_timer_run.png`, tb_timer_pause: `${tb}/tb_timer_pause.png`, tb_timer_done: `${tb}/tb_timer_done.png`,
  tb_countdown: `${tb}/tb_countdown_run.png`, tb_countdown_alarm: `${tb}/tb_countdown_alarm.png`, tb_countdown_done: `${tb}/tb_countdown_done.png`,
  iv_prep_combi: `${iv}/iv_prep_combi.png`, iv_work_combi: `${iv}/iv_work_combi.png`, iv_rest_combi: `${iv}/iv_rest_combi.png`,
  iv_work_time: `${iv}/iv_work_time.png`, iv_rest_time: `${iv}/iv_rest_time.png`, iv_work_rounds: `${iv}/iv_work_rounds.png`, iv_rest_rounds: `${iv}/iv_rest_rounds.png`,
};
const phone = {
  shot: "games/basketball/docs/ui/web-basketball-shot-running.png", game: "games/basketball/docs/ui/web-basketball-game-running.png",
  score: "games/basketball/docs/ui/web-basketball-score-on.png", cc: "games/colourcycle/docs/ui/web-colourcycle-cycle-running.png",
  tb: "games/timebar/docs/ui/web-timebar-bar-running.png", iv: "games/intervaltimer/docs/ui/web-intervaltimer-session-work.png", pair: "docs/design/target-ui/web-pairing.png", roles: "docs/design/target-ui/web-games-job.png",
};
const photo = "print/photos/fully_assembled_stacked.png";
const missing = [...Object.values(panels), ...Object.values(phone), photo].filter(path => !existsSync(`${repo}/${path}`));
if (missing.length) {
  console.error(`Cannot sync media: missing files in ${repo}:\n${missing.map(path => `  ${path}`).join("\n")}\nCheck out the complete gamiq repository at ../gamiq or set GAMIQ_REPO to its path.`);
  process.exit(1);
}
mkdirSync(`${out}/panels`, { recursive: true });
mkdirSync(`${out}/phone`, { recursive: true });
mkdirSync(`${out}/photos`, { recursive: true });
for (const [n, p] of Object.entries(panels)) copyFileSync(`${repo}/${p}`, `${out}/panels/${n}.png`);
for (const [n, p] of Object.entries(phone)) copyFileSync(`${repo}/${p}`, `${out}/phone/${n}.png`);
await sharp(`${repo}/${photo}`).resize(1200).jpeg({ quality: 78 }).toFile(`${out}/photos/stacked.jpg`);
console.log("media synced");
