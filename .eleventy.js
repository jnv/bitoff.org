const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");

const addFilters = require("./src/filters");
const addShortcodes = require("./src/shortcodes");
const amendMarkdown = require("./src/markdown");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./public/": "/" });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  addFilters(eleventyConfig);
  addShortcodes(eleventyConfig);

  // For JSON feed
  eleventyConfig.addJavaScriptFunction("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.addJavaScriptFunction(
    "htmlToAbsoluteUrls",
    pluginRss.convertHtmlToAbsoluteUrls
  );
  eleventyConfig.addJavaScriptFunction(
    "dateToRfc3339",
    pluginRss.dateToRfc3339
  );

  eleventyConfig.amendLibrary("md", (mdLib) =>
    amendMarkdown(mdLib, eleventyConfig)
  );

  // Override @11ty/eleventy-dev-server defaults (used only with --serve)
  eleventyConfig.setServerOptions({
    showVersion: true,
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "11ty.js"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
