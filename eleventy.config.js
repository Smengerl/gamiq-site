// Languages come from the files in src/_data/i18n/: one folder per language, named by meta.lang (#472, section 4).
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/root": "." });
  return { dir: { input: "src", includes: "_includes", data: "_data", output: "_site" } };
}
