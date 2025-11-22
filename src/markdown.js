import markdownItAnchor from 'markdown-it-anchor';
import footnote from 'markdown-it-footnote';
import markdownItReplaceLink from 'markdown-it-replace-link';
import path from 'node:path';

export default (mdLib, eleventyConfig) => {
  mdLib.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter('slug'),
  });
  mdLib.use(footnote);
  mdLib.use(markdownItReplaceLink, {
    processHTML: true,
    replaceLink: (link, env, token, htmlToken) => {
      if (!link.match(/^\.\.?\//)) {
        return link;
      }
      // console.log('Replacing link:', link);
      let cleanLink = link.replace(/\/index\.md$/, '').replace(/\.md$/, '');
      const basename = path.basename(cleanLink);
      const withoutDate = basename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

      // console.log('Cleaned link:', '/' + withoutDate);
      return '/' + withoutDate;
    },
  });
  mdLib.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' +
    '<h2>Footnotes</h2>\n' +
    '<ol class="footnotes-list">\n';
};
