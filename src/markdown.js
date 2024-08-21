import markdownItAnchor from 'markdown-it-anchor';
import footnote from 'markdown-it-footnote';

export default (mdLib, eleventyConfig) => {
  mdLib.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter('slug'),
  });
  mdLib.use(footnote);
  mdLib.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' +
    '<h2>Footnotes</h2>\n' +
    '<ol class="footnotes-list">\n';
};
