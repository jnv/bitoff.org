import { getFeedTemplate } from '@11ty/eleventy-plugin-rss';

// Fail visibly if an upstream template changes the markup we adapt for compatibility.
function replaceRequired(content, original, replacement) {
  if (!content.includes(original)) {
    throw new Error(`RSS plugin template changed: missing ${original}`);
  }
  return content.replace(original, replacement);
}

export default function (eleventyConfig, metadata) {
  const options = {
    collection: { name: 'posts', sort: 'descending', limit: 0 },
    metadata: {
      ...metadata,
      subtitle: metadata.feed.subtitle,
      description: metadata.feed.subtitle,
    },
    templateData: { noSitemap: true },
  };

  for (const type of ['atom', 'json']) {
    const { content, data } = getFeedTemplate({
      ...options,
      type,
      outputPath: type === 'atom' ? metadata.feed.path : metadata.jsonfeed.path,
    });

    // The plugin uses URLs as IDs; retain the IDs readers already know.
    const entryId = '{{ metadata.feed.id }}:posts:{{ post.fileSlug }}';
    let adapted;
    if (type === 'atom') {
      adapted = replaceRequired(
        content,
        '<id>{{ absolutePostUrl }}</id>',
        `<id>${entryId}</id>`
      );
      adapted = replaceRequired(
        adapted,
        '<id>{{ metadata.base | addPathPrefixToFullUrl }}</id>',
        '<id>{{ metadata.feed.id }}</id>'
      );
      data.eleventyNavigation = { key: 'RSS', order: 10 };
      data.eleventyExcludeFromCollections = false;
    } else {
      adapted = replaceRequired(
        content,
        '"id": "{{ absolutePostUrl }}"',
        `"id": "${entryId}"`
      );
      adapted = replaceRequired(
        adapted,
        'mailto:{{ metadata.author.email }}',
        '{{ metadata.author.url }}'
      );
      adapted = replaceRequired(
        adapted,
        'if metadata.author.email',
        'if metadata.author.url'
      );
      data.eleventyExcludeFromCollections = true;
    }

    eleventyConfig.addTemplate(`feed/${type}.njk`, adapted, data);
  }
}
