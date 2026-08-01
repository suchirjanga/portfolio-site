import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  completionDate?: string;
  order?: number;
  status: 'shipped' | 'in-progress' | 'archived';
  projectType?: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  tech: string[];
  featured?: boolean;
  hidden?: boolean;
  body: string;
};

type Frontmatter = {
  title: string;
  role: string;
  year: string | number;
  completionDate?: string | Date;
  order?: number;
  status?: Project['status'];
  projectType?: string;
  slug?: string;
  description?: string;
  thumbnail: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  tech?: string[];
  featured?: boolean;
  hidden?: boolean;
};

// Shared content home (Next.js now, Decap in Phase 7); the legacy Vite
// app globs the same folder from src/content/projects.ts.
const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

function parseProject(filename: string, raw: string): Project {
  const parsed = fm<Frontmatter>(raw);
  const attrs = parsed.attributes;
  return {
    slug: attrs.slug ?? filename.replace(/\.md$/, ''),
    title: attrs.title,
    role: attrs.role,
    year: String(attrs.year),
    completionDate: attrs.completionDate
      ? toIsoDate(attrs.completionDate)
      : undefined,
    order: typeof attrs.order === 'number' ? attrs.order : undefined,
    status: attrs.status ?? 'shipped',
    projectType: attrs.projectType,
    description: attrs.description ?? '',
    thumbnail: attrs.thumbnail,
    gallery: attrs.gallery ?? [],
    liveUrl: attrs.liveUrl,
    githubUrl: attrs.githubUrl,
    tech: attrs.tech ?? [],
    featured: attrs.featured,
    hidden: attrs.hidden,
    body: parsed.body,
  };
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Visible projects, sorted by explicit `order` first, then newest year. */
export function getProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseProject(f, fs.readFileSync(path.join(PROJECTS_DIR, f), 'utf8')))
    .filter((p) => !p.hidden)
    .sort((a, b) => {
      if (a.order != null && b.order != null && a.order !== b.order) {
        return a.order - b.order;
      }
      if (a.order != null && b.order == null) return -1;
      if (a.order == null && b.order != null) return 1;
      const ay = parseInt(a.year, 10);
      const by = parseInt(b.year, 10);
      if (Number.isFinite(ay) && Number.isFinite(by) && ay !== by) return by - ay;
      return a.title.localeCompare(b.title);
    });
}
