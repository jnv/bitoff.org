import assert from 'node:assert/strict';
import { copyFile, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import Eleventy from '@11ty/eleventy';
import pluginRss from '@11ty/eleventy-plugin-rss';
import metadata from '../_data/metadata.json' with { type: 'json' };

test('feed templates preserve identity, metadata, content, and collection membership', async () => {
  const input = await mkdtemp(path.join(tmpdir(), 'bitoff-feeds-'));
  try {
    const output = path.join(input, '_site');
    await mkdir(path.join(input, 'feed'));
    for (const name of ['feed.njk', 'json.njk']) {
      await copyFile(
        new URL(`../feed/${name}`, import.meta.url),
        path.join(input, 'feed', name)
      );
    }
    const site = new Eleventy(input, output, {
      configPath: false,
      config(config) {
        config.addPlugin(pluginRss);
        config.addGlobalData('metadata', metadata);
        // Deliberately unsorted, with a newer URL-less entry that must be skipped.
        for (const [slug, date, permalink] of [
          ['new', '2026-02-01', '/new/'],
          ['hidden', '2026-03-01', false],
          ['old', '2026-01-01', '/old/'],
        ]) {
          config.addTemplate(
            `${slug}.njk`,
            '<a href="/article/">Link</a><img src="/image.png">',
            {
              tags: ['posts'],
              title: slug,
              date,
              permalink,
            }
          );
        }
        config.addTemplate(
          'collections.njk',
          '{% for item in collections.all %}{{ item.url }}:{{ item.data.noSitemap }}:{{ item.data.eleventyNavigation.key }};{% endfor %}',
          {
            permalink: '/collections.txt',
            eleventyExcludeFromCollections: true,
          }
        );
      },
    });
    await site.write();
    const json = JSON.parse(
      await readFile(path.join(output, 'feed.json'), 'utf8')
    );
    assert.deepEqual(
      json.items.map((item) => item.id),
      ['new', 'old'].map((slug) => `${metadata.feed.id}:posts:${slug}`)
    );
    assert.deepEqual(
      json.items.map((item) => item.url),
      ['new', 'old'].map((slug) => `${metadata.base}${slug}/`)
    );
    assert.equal(json.language, metadata.language);
    assert.equal(json.title, metadata.title);
    assert.equal(json.description, metadata.feed.subtitle);
    assert.equal(
      json.feed_url,
      new URL(metadata.jsonfeed.path, metadata.base).href
    );
    assert.deepEqual(json.authors, [
      { name: metadata.author.name, url: metadata.author.url },
    ]);
    for (const item of json.items) {
      assert.ok(item.content_html.includes(`href="${metadata.base}article/"`));
      assert.ok(item.content_html.includes(`src="${metadata.base}image.png"`));
    }
    const atom = await readFile(path.join(output, 'feed.xml'), 'utf8');
    assert.deepEqual(
      [...atom.matchAll(/<id>(.*?)<\/id>/g)].map((match) => match[1]),
      [metadata.feed.id, ...json.items.map((item) => item.id)]
    );
    assert.ok(atom.includes('<updated>2026-02-01T00:00:00Z</updated>'));
    assert.ok(atom.includes(`<email>${metadata.author.email}</email>`));
    assert.ok(!atom.includes('hidden'));
    const collections = await readFile(
      path.join(output, 'collections.txt'),
      'utf8'
    );
    assert.ok(collections.includes('/feed.xml:true:RSS;'));
    assert.ok(!collections.includes('/feed.json'));
  } finally {
    await rm(input, { recursive: true, force: true });
  }
});
