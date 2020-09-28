import fs from 'fs';
import { join, relative } from 'path';
import matter from 'gray-matter';
import m2r from 'minutes-to-read';
import format from 'date-fns/format';

import { getTagBySlug } from './tags';
import { getAuthorsFromIds } from './authors';

const EXCERPT_LENGTH = 140;

const CONTENT_DIRECTORY = join(process.cwd(), process.env.CONTENT_DIR);
const POSTS_DIRECTORY = join(CONTENT_DIRECTORY, 'posts');

const getExcerpt = (file, options) => {
  file.excerpt = file.content.substring(0, EXCERPT_LENGTH);
};

export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: getExcerpt,
  });

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items[field] = realSlug;
        break;
      case 'content':
        items[field] = content;
        break;
      case 'excerpt':
        items[field] = excerpt;
        break;
      case 'reading_time':
        items['reading_time'] = m2r(content);
        break;
      case 'published_at':
        items['published_at'] = format(new Date(data.published_at), 'MMM d, y');
        break;
      case 'authors':
        const authors = data?.authors;
        if (authors) {
          items['authors'] = getAuthorsFromIds(authors);
        }
        break;
      case 'primary_tag':
        const firstTag = data?.tags?.[0];
        if (firstTag) {
          items['primary_tag'] = getTagBySlug(firstTag);
        }
        break;
      default:
        if (data[field]) {
          items[field] = data[field];
        }
        break;
    }
  });

  return items;
}

export function getAllPosts(fields = [], options = { featured: false }) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => {
      if (options.featured) {
        return post.featured;
      }
      return true;
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
  return posts;
}

const getPostsByTag = (tagSlug = '', fields = []) => {
  const slugs = getPostSlugs();
  const posts = [];

  slugs.forEach((slug) => {
    const post = getPostBySlug(slug, fields);
    if (post.tags?.includes(tagSlug)) {
      posts.push(post);
    }
  });

  return posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
};

const getPostsByAuthor = (authorId = '', fields = []) => {
  const slugs = getPostSlugs();
  const posts = [];

  slugs.forEach((slug) => {
    const post = getPostBySlug(slug, fields);
    if (post.authors?.findIndex((author) => author.id === authorId) > -1) {
      posts.push(post);
    }
  });

  return posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
};

export default {
  getAllPosts,
  getPostBySlug,
  getPostBySlug,
  getPostsByTag,
  getPostsByAuthor,
};
