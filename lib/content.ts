export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** Short listing text; falls back to description. */
  excerpt?: string;
  /** ISO date, e.g. "2026-07-21". */
  date: string;
  lastUpdated?: string;
  author?: string;
  readingMinutes: number;
  tags: string[];
  featured?: boolean;
  /** Mono glyph used by CoverArt when the post has no cover image. */
  symbol?: string;
  /** Optional cover image path (public/) — takes precedence over symbol. */
  cover?: string;
  /** In the repo but rendered nowhere. */
  draft?: boolean;
  /** Archived: kept in the repo, hidden from the site. */
  hidden?: boolean;
};

export type NoteMeta = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  /** ISO date. */
  date: string;
  lastUpdated?: string;
  readingMinutes: number;
  tags?: string[];
  cover?: string;
  featured?: boolean;
  draft?: boolean;
  hidden?: boolean;
};
