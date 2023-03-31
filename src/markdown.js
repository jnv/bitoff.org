const markdownItAnchor = require("markdown-it-anchor");
const footnote = require("markdown-it-footnote");

module.exports = (mdLib, eleventyConfig) => {
  mdLib.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slug"),
  });
  mdLib.use(footnote);
};
