# gamiq-site

The public website of GAMiq for interested clubs. Concept, content and design: `docs/design/website.md` in the gamiq repository (#472).
Static pages built with Eleventy; texts in `src/_data/i18n/<lang>.json` (one file per language, the list of files is the list of languages);
design tokens of the phone page, panel renders, phone screenshots and photos are copied from the gamiq repository.

```bash
npm install
npm run sync     # copy tokens and media from ../gamiq (or GAMIQ_REPO=<path>); commit the result
npm run serve    # local preview
npm run check    # i18n parity, build, links, one h1 per page, size budget
```

- `src/css/tokens.css` and `src/assets/` are synced, never edited here.
- Paths are language-neutral below `/<lang>/` (`/de/`, `/en/`); the folder name is `meta.lang` of the language file.
- Status: skeleton with the home page in German and English; imprint, privacy and the open page are stubs until the preconditions of #472 are settled. Contact address is `TBD`.
- Licence of the code: GPL-3.0-or-later. Pictures from the gamiq repository: CC BY-SA 4.0.
