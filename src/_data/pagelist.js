// Pages other than the home page, once per language: the paths are the same in every language. Their content follows in phase 3 (docs/design/website.md).
import languages from "./languages.js";
const slugs = ["open", "imprint", "privacy"];
export default languages.flatMap((L) => slugs.map((slug) => ({ L, slug })));
