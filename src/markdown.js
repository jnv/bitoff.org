import markdownItAnchor from 'markdown-it-anchor';
import footnote from 'markdown-it-footnote';
import markdownItReplaceLink from 'markdown-it-replace-link';

export default (mdLib, eleventyConfig) => {
  const slugify = eleventyConfig.getFilter('slugify');
  mdLib.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify,
  });
  mdLib.use(footnote);
  mdLib.use(markdownItReplaceLink, {
    processHTML: false, // breaks inline html: https://github.com/martinheidegger/markdown-it-replace-link/issues/8
    replaceLink: (link) => {
      if (!/^\.\.?\/.+\.md/.test(link)) {
        return link;
      }

      try {
        const u = new URL(link, 'http://n/');

        const segments = u.pathname.split('/').filter(Boolean);
        if (!segments.length) {
          return link;
        }
        let last = segments.pop();
        if (last === 'index.md') {
          last = segments.pop() || last;
        }
        const finalPath = last
          .replace(/.md$/, '')
          .replace(/^\d{4}-\d{2}-\d{2}-/, '');
        // console.log(`Rewriting link ${link} to /${finalPath}${u.hash}`);
        return '/' + finalPath + u.hash;
      } catch {
        return link;
      }
    },
  });
  mdLib.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes">\n' +
    '<h2>Footnotes</h2>\n' +
    '<ol class="footnotes-list">\n';
};
