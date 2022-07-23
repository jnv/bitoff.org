const { DateTime } = require("luxon");

const createDateFormat = (format) => (dateObj) =>
  DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("readableDate", createDateFormat("DDD"));
  eleventyConfig.addFilter("shortDate", createDateFormat("MMM yyyy"));
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", createDateFormat("yyyy-LL-dd"));
};
