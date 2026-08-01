export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-07-21". */
  date: string;
  readingMinutes: number;
  tags: string[];
  featured?: boolean;
  /** Mono glyph used by CoverArt when the post has no cover image. */
  symbol?: string;
  /** Optional cover image path (public/) — takes precedence over symbol. */
  cover?: string;
  draft?: boolean;
};

export type NoteMeta = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  /** ISO date. */
  date: string;
};
