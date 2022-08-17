// Based on https://github.com/11ty/eleventy-plugin-rss/blob/5cf83502e29b88b32772f0274fcf9dd4041b4549/sample/feed-json.11ty.js
module.exports.data = {
  permalink: ({ metadata }) => metadata.jsonfeed.path,
  eleventyExcludeFromCollections: true,
};

module.exports.render = async function (data) {
  const { permalink, metadata, collections } = data;
  const sliceStart = -1 * metadata.feed.limit;

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: metadata.title,
    language: metadata.language,
    home_page_url: metadata.url,
    feed_url: this.absoluteUrl(this.url(permalink(data)), metadata.url),
    description: metadata.subtitle,
    author: {
      name: metadata.author.name,
      url: metadata.author.url,
    },
    items: [],
  };

  for (const post of collections.posts.slice(sliceStart).reverse()) {
    const absolutePostUrl = this.absoluteUrl(this.url(post.url), metadata.url);
    const item = {
      id: `${metadata.feed.id}:posts:${post.fileSlug}`,
      url: absolutePostUrl,
      title: post.data.title,
      date_published: this.dateToRfc3339(post.date),
      content_html: await this.htmlToAbsoluteUrls(
        post.templateContent,
        absolutePostUrl
      ),
    };
    feed.items.push(item);
  }

  return JSON.stringify(feed);
};
