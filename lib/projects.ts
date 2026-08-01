import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  order?: number;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  body: string;
};

type Frontmatter = {
  title: string;
  role: string;
  year: string | number;
  order?: number;
  slug?: string;
  description?: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
};

// The markdown still lives in the legacy Vite tree; Phase 5 moves it to
// content/projects (Decap's home) and only this path changes.
const PROJECTS_DIR = path.join(process.cwd(), 'src', 'content', 'projects');

function parseProject(filename: string, raw: string): Project {
  const parsed = fm<Frontmatter>(raw);
  const attrs = parsed.attributes;
  return {
    slug: attrs.slug ?? filename.replace(/\.md$/, ''),
    title: attrs.title,
    role: attrs.role,
    year: String(attrs.year),
    order: typeof attrs.order === 'number' ? attrs.order : undefined,
    description: attrs.description ?? '',
    thumbnail: attrs.thumbnail,
    liveUrl: attrs.liveUrl,
    githubUrl: attrs.githubUrl,
    body: parsed.body,
  };
}

/** All projects, sorted by explicit `order` first, then newest year. */
export function getProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseProject(f, fs.readFileSync(path.join(PROJECTS_DIR, f), 'utf8')))
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
