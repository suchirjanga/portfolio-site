import { getAllNotes } from '@/lib/notes';
import { getAboutPage, getResumePage } from '@/lib/pages';
import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';

export type SearchDoc = {
  id: string;
  type: 'article' | 'note' | 'project' | 'page';
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

  const notes: SearchDoc[] = getAllNotes().map((n) => ({
    id: `note:${n.slug}`,
    type: 'note',
    title: n.title,
    description: n.summary,
    body: n.body,
    tags: n.category,
    url: `/notes/${n.slug}`,
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

  const about = getAboutPage();
  const resume = getResumePage();
  const pages: SearchDoc[] = [
    {
      id: 'page:about',
      type: 'page',
      title: 'About',
      description: about.headline,
      body: [about.body, ...about.skills, ...about.techStack].join(' '),
      tags: 'about bio',
      url: '/#about',
    },
    {
      id: 'page:resume',
      type: 'page',
      title: 'Resume',
      description: resume.summary,
      body: [
        ...resume.experience.flatMap((e) => [
          e.role,
          e.organization,
          ...(e.details ?? []),
        ]),
        ...resume.education.map((e) => `${e.degree} ${e.institution}`),
        ...resume.skills,
        ...resume.certifications,
        ...resume.achievements,
      ].join(' '),
      tags: 'resume cv experience education',
      url: '/resume',
    },
  ];

  return [...posts, ...notes, ...projects, ...pages];
}
