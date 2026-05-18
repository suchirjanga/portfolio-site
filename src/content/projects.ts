import fm from 'front-matter';

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
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
  slug?: string;
  description?: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
};

// Vite picks up any .md added to /src/content/projects/ at build time.
// To add a project: drop a new .md file in that folder, drop images into
// public/projects/<slug>/, and redeploy. No code changes needed.
const modules = import.meta.glob('./projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.md$/, '');
}

function parseProject(path: string, raw: string): Project {
  const parsed = fm<Frontmatter>(raw);
  const attrs = parsed.attributes;
  const slug = attrs.slug ?? slugFromPath(path);
  return {
    slug,
    title: attrs.title,
    role: attrs.role,
    year: String(attrs.year),
    description: attrs.description ?? '',
    thumbnail: attrs.thumbnail,
    liveUrl: attrs.liveUrl,
    githubUrl: attrs.githubUrl,
    body: parsed.body,
  };
}

const all: Project[] = Object.entries(modules)
  .map(([path, raw]) => parseProject(path, raw))
  .sort((a, b) => {
    const ay = parseInt(a.year, 10);
    const by = parseInt(b.year, 10);
    if (Number.isFinite(ay) && Number.isFinite(by) && ay !== by) return by - ay;
    return a.title.localeCompare(b.title);
  });

export const projects: Project[] = all;

export function getProject(slug: string): Project | undefined {
  return all.find((p) => p.slug === slug);
}
