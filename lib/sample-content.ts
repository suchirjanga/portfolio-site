import type { NoteMeta } from '@/lib/content';

/*
  SAMPLE DATA — placeholder notes so the homepage/notes sections can be
  designed and reviewed. Replaced by the real notes pipeline in Phase 6.
  (Blog posts are real MDX in content/blog since Phase 4.)
*/

export const SAMPLE_NOTES: NoteMeta[] = [
  {
    slug: 'sliding-window-patterns',
    title: 'Sliding window patterns',
    summary:
      'Fixed vs dynamic windows, and the three tell-tale signs a problem wants one.',
    category: 'DSA',
    date: '2026-07-18',
  },
  {
    slug: 'consistent-hashing',
    title: 'Consistent hashing in five minutes',
    summary: 'Why naive modulo sharding falls over, and what the ring fixes.',
    category: 'System Design',
    date: '2026-07-12',
  },
  {
    slug: 'temperature-vs-top-p',
    title: 'Temperature vs top-p, practically',
    summary: 'What each knob actually changes about sampling, with examples.',
    category: 'AI',
    date: '2026-07-05',
  },
  {
    slug: 'postgres-btree-first',
    title: 'Postgres indexes: B-tree first',
    summary: 'When the default index is right, and the cases that need GIN.',
    category: 'Backend',
    date: '2026-06-30',
  },
];
