'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/toc';
import { cn } from '@/lib/cn';

type Props = {
  entries: TocEntry[];
};

export default function TableOfContents({ entries }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Track the band just below the header so the current section wins.
      { rootMargin: '-80px 0px -70% 0px' },
    );

    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-1">
      <span className="mb-2 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
        On this page
      </span>
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          className={cn(
            'border-l py-1 text-sm leading-snug transition-colors duration-200',
            entry.depth === 2 ? 'pl-3' : 'pl-6',
            activeId === entry.id
              ? 'border-gold text-gold'
              : 'border-border text-ink-muted hover:text-ink',
          )}
        >
          {entry.text}
        </a>
      ))}
    </nav>
  );
}
