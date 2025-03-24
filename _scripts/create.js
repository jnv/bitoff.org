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

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const slugifiedTitle = slugify(title);
    const articleDir = path.join(
      __dirname,
      '..',
      'posts',
      `${formattedDate}-${slugifiedTitle}`
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
