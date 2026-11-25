# gamiq-site

Static club-facing website of GAMiq (Eleventy). Concept: `docs/design/website.md` in the gamiq repository (#472).

- Texts only in `src/_data/i18n/<lang>.json`, same keys in every language (`npm run check`). A new language is a new file, nothing else names a language.
- `src/css/tokens.css` and `src/assets/` are synced from the gamiq repository by `npm run sync`; do not edit them. Site-only additions go to `src/css/site.css`.
- Claims only with evidence: no price, no "hall-proof", "certified" or "ball-safe" (#370, #30, #368, #367). Contact address and imprint stay `TBD` until #472's preconditions are settled.
- No cookies, no tracking, no external font or script. A page without images stays under 100 KB of HTML.
- Ask before outward actions: no push, no GitHub repository, no Pages switch-on without the owner's yes.
