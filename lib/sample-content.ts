import type { NoteMeta, PostMeta } from '@/lib/content';

/*
  SAMPLE DATA — placeholder posts/notes so the homepage sections can be
  designed and reviewed. Replaced by the real MDX content pipeline in
  Phase 4 (blog) and Phase 6 (notes). Nothing here is published writing.
*/

export const SAMPLE_POSTS: PostMeta[] = [
  {
    slug: 'understanding-embeddings',
    title: 'Understanding Embeddings: The Missing Intuition',
    description:
      'A deep dive into embeddings, vector spaces, and why they power modern AI systems.',
    date: '2026-07-21',
    readingMinutes: 8,
    tags: ['AI', 'NLP'],
    featured: true,
    symbol: '∿',
  },
  {
    slug: 'rag-system-from-scratch',
    title: 'How I Built a RAG System from Scratch',
    description:
      'A step-by-step build of a retrieval-augmented generation pipeline, and the parts the tutorials skip.',
    date: '2026-07-10',
    readingMinutes: 10,
    tags: ['RAG', 'LLM'],
    symbol: 'λ',
  },
  {
    slug: 'practical-system-design',
    title: 'A Practical Guide to System Design',
    description:
      'Breaking system design into simple, repeatable steps with real-world examples.',
    date: '2026-06-28',
    readingMinutes: 12,
    tags: ['System Design'],
    symbol: '{}',
  },
  {
    slug: 'two-pointer-technique',
    title: 'Mastering the Two-Pointer Technique',
    description:
      'The patterns behind two-pointer problems and how to recognize them under pressure.',
    date: '2026-06-15',
    readingMinutes: 6,
    tags: ['DSA'],
    symbol: '#',
  },
];

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
