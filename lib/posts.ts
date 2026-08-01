import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';
import type { PostMeta } from '@/lib/content';
import { readingMinutes } from '@/lib/reading-time';

export type Post = PostMeta & { body: string };

type PostFrontmatter = {
  title: string;
  description?: string;
  /** YAML parses unquoted dates to Date objects — accept both. */
  date: string | Date;
  tags?: string[];
  featured?: boolean;
  symbol?: string;
  cover?: string;
  draft?: boolean;
  slug?: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

function parsePost(filename: string, raw: string): Post {
  const parsed = fm<PostFrontmatter>(raw);
  const attrs = parsed.attributes;
  return {
    slug: attrs.slug ?? filename.replace(/\.mdx?$/, ''),
    title: attrs.title,
    description: attrs.description ?? '',
    date: toIsoDate(attrs.date),
    readingMinutes: readingMinutes(parsed.body),
    tags: attrs.tags ?? [],
    featured: attrs.featured,
    symbol: attrs.symbol,
    cover: attrs.cover,
    draft: attrs.draft,
    body: parsed.body,
  };
}

let cache: Post[] | null = null;

/** All published posts, newest first. Drafts are excluded everywhere. */
export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => parsePost(f, fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
      .filter((p) => !p.draft)
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Chronological neighbors: `newer` is more recent, `older` less so. */
export function getAdjacentPosts(slug: string): {
  newer?: Post;
  older?: Post;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}

/** Posts sharing the most tags with `post`; recency breaks ties. */
export function getRelatedPosts(post: PostMeta, limit = 2): Post[] {
  const tagSet = new Set(post.tags);
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .sort(
      (a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date),
    )
    .slice(0, limit)
    .map((r) => r.post);
}
