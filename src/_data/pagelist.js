// Pages other than the home page, once per language: the paths are the same in every language. Imprint and privacy stay stubs until the preconditions of #472 are settled.
import languages from "./languages.js";
const slugs = ["features", "faq", "hardware", "licences", "imprint", "privacy"];
export default languages.flatMap((L) => slugs.map((slug) => ({ L, slug })));
