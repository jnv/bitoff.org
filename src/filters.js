import { DateTime } from "luxon";

const createDateFormat = (format) => (dateObj) =>
  DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);

const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

function linkifyMap(obj = {}) {
  const links = Object.entries(obj).map(([site, url]) => {
    return `<a href="${url}" class="u-syndication">${site}</a>`;
  });

  return listFormatter.format(links);
}

export default (eleventyConfig) => {
  eleventyConfig.addFilter("readableDate", createDateFormat("DDD"));
  eleventyConfig.addFilter("shortDate", createDateFormat("MMM yyyy"));
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", createDateFormat("yyyy-LL-dd"));
  eleventyConfig.addFilter("linkifyMap", linkifyMap);
};
