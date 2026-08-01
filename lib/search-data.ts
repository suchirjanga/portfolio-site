import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';
import { SAMPLE_NOTES } from '@/lib/sample-content';

export type SearchDoc = {
  id: string;
  type: 'article' | 'note' | 'project';
  title: string;
  description: string;
  body: string;
  /** Tags/category flattened for indexing. */
  tags: string;
  url: string;
};

/** One flat corpus for the client-side search index. */
export function buildSearchDocs(): SearchDoc[] {
  const posts: SearchDoc[] = getAllPosts().map((p) => ({
    id: `article:${p.slug}`,
    type: 'article',
    title: p.title,
    description: p.description,
    body: p.body,
    tags: p.tags.join(' '),
    url: `/blog/${p.slug}`,
  }));

  // Sample notes until Phase 6; note pages land on the index for now.
  const notes: SearchDoc[] = SAMPLE_NOTES.map((n) => ({
    id: `note:${n.slug}`,
    type: 'note',
    title: n.title,
    description: n.summary,
    body: '',
    tags: n.category,
    url: '/notes',
  }));

  const projects: SearchDoc[] = getProjects().map((p) => ({
    id: `project:${p.slug}`,
    type: 'project',
    title: p.title,
    description: p.description,
    body: p.body,
    tags: [p.role, ...p.tech].join(' '),
    url: `/projects/${p.slug}`,
  }));

  return [...posts, ...notes, ...projects];
}
