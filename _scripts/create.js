import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline/promises';
import slugify from '@sindresorhus/slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getTemplateContents(title) {
  return `---
title: ${title}
description:
---
`;
}

async function createArticle() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const title = await rl.question('Enter article title: ');
    let slug = await rl.question(
      'Enter article slug (optional, press Enter to skip): '
    );
    slug ??= slugify(title);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const articleDir = path.join(
      __dirname,
      '..',
      'posts',
      `${formattedDate}-${slug}`
    );
    const articleFile = path.join(articleDir, 'index.md');

    await fs.mkdir(articleDir, { recursive: true });
    await fs.writeFile(articleFile, getTemplateContents(title), 'utf8');

    console.log(`Article template created at: ${articleFile}`);
  } catch (error) {
    console.error('Error creating article template:', error);
  } finally {
    rl.close();
  }
}

createArticle();
