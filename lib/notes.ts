import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';
import type { NoteMeta } from '@/lib/content';
import { readingMinutes } from '@/lib/reading-time';

export type Note = NoteMeta & { body: string };

type NoteFrontmatter = {
  title: string;
  summary?: string;
  category: string;
  /** YAML parses unquoted dates to Date objects — accept both. */
  date: string | Date;
  draft?: boolean;
  slug?: string;
};

const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

function parseNote(filename: string, raw: string): Note {
  const parsed = fm<NoteFrontmatter>(raw);
  const attrs = parsed.attributes;
  return {
    slug: attrs.slug ?? filename.replace(/\.mdx?$/, ''),
    title: attrs.title,
    summary: attrs.summary ?? '',
    category: attrs.category,
    date: toIsoDate(attrs.date),
    readingMinutes: readingMinutes(parsed.body),
    draft: attrs.draft,
    body: parsed.body,
  };
}

let cache: Note[] | null = null;

/** All published notes, newest first. Drafts are excluded everywhere. */
export function getAllNotes(): Note[] {
  if (!cache) {
    cache = fs
      .readdirSync(NOTES_DIR)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => parseNote(f, fs.readFileSync(path.join(NOTES_DIR, f), 'utf8')))
      .filter((n) => !n.draft)
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  return cache;
}

export function getNote(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

/** Categories in alphabetical order with their notes (newest first). */
export function getNotesByCategory(): { category: string; notes: Note[] }[] {
  const groups = new Map<string, Note[]>();
  for (const note of getAllNotes()) {
    const list = groups.get(note.category) ?? [];
    list.push(note);
    groups.set(note.category, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, notes]) => ({ category, notes }));
}
