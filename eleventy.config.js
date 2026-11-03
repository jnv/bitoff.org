import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginNavigation from '@11ty/eleventy-navigation';
import markdownIt from 'markdown-it';

import pluginFilters from './src/filters.js';
import pluginShortcodes from './src/shortcodes.js';
import amendMarkdown from './src/markdown.js';
import pluginDrafts from './src/drafts.js';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ './public/': '/' });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addPlugin(pluginDrafts);
  eleventyConfig.addPlugin(pluginFilters);
  eleventyConfig.addPlugin(pluginShortcodes);

  const mdOptions = {
    html: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(mdOptions));
  eleventyConfig.amendLibrary('md', (mdLib) =>
    amendMarkdown(mdLib, eleventyConfig)
  );

  // Override @11ty/eleventy-dev-server defaults (used only with --serve)
  eleventyConfig.setServerOptions({
    showVersion: true,
  });

  return {
    templateFormats: ['md', 'njk', 'html', '11ty.js'],
    // Pre-process *.md files with:
    markdownTemplateEngine: 'njk',
    // Pre-process *.html files with:
    htmlTemplateEngine: 'njk',

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: '/',
    // -----------------------------------------------------------------

    // These are all optional:
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
}
