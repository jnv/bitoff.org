import markdownItAnchor from "markdown-it-anchor";
import footnote from "markdown-it-footnote";

export default (mdLib, eleventyConfig) => {
  mdLib.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slug"),
  });
  mdLib.use(footnote);
};
