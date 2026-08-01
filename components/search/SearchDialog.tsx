'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type MiniSearch from 'minisearch';
import { SearchIcon } from '@/components/nav/icons';
import { cn } from '@/lib/cn';

export const OPEN_SEARCH_EVENT = 'sjanga:search-open';

type Doc = {
  id: string;
  type: 'article' | 'note' | 'project' | 'page';
  title: string;
  description: string;
  url: string;
};

type Result = Doc;

const TYPE_LABEL: Record<Doc['type'], string> = {
  article: 'Articles',
  note: 'Notes',
  project: 'Projects',
  page: 'Pages',
};

const TYPE_ORDER: Doc['type'][] = ['article', 'note', 'project', 'page'];

// Index is built once per session, lazily on first open.
let indexPromise: Promise<MiniSearch<Doc>> | null = null;

function loadIndex(): Promise<MiniSearch<Doc>> {
  indexPromise ??= (async () => {
    const [{ default: MiniSearchCtor }, docs] = await Promise.all([
      import('minisearch'),
      fetch('/search-index.json').then((r) => r.json()),
    ]);
    const mini = new MiniSearchCtor<Doc>({
      fields: ['title', 'description', 'body', 'tags'],
      storeFields: ['title', 'description', 'type', 'url'],
      searchOptions: {
        boost: { title: 3, tags: 2, description: 1.5 },
        prefix: true,
        fuzzy: 0.15,
      },
    });
    mini.addAll(docs);
    return mini;
  })();
  return indexPromise;
}

export default function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setSelected(0);
  };

  // Open triggers: sidebar/mobile buttons dispatch a window event; Ctrl/⌘+K.
  useEffect(() => {
    const onOpenEvent = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenEvent);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpenEvent);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // While open: focus the input, lock scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const runSearch = async (q: string) => {
    setQuery(q);
    setSelected(0);
    if (q.trim().length === 0) {
      setResults([]);
      return;
    }
    const mini = await loadIndex();
    const hits = mini.search(q) as unknown as Result[];
    setResults(hits.slice(0, 12));
  };

  const go = (url: string) => {
    close();
    router.push(url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault();
      go(results[selected].url);
    }
  };

  if (!open) return null;

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden
        onClick={close}
        className="fixed inset-0 bg-overlay backdrop-blur-sm motion-safe:animate-[overlay-in_0.15s_ease-out]"
      />
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-card border border-border-strong bg-surface shadow-2xl motion-safe:animate-[panel-in_0.2s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="size-4.5 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => runSearch(e.target.value)}
            aria-label="Search articles, notes, and projects"
            placeholder="Search articles, notes, projects…"
            className="h-12 w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-faint">
            esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              Type to search across articles, notes, and projects.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              No results for “{query}”.
            </p>
          ) : (
            grouped.map((group) => (
              <div key={group.type} className="mb-1">
                <p className="px-3 pt-2 pb-1 font-mono text-[0.65rem] tracking-[0.18em] text-ink-faint uppercase">
                  {TYPE_LABEL[group.type]}
                </p>
                {group.items.map((r) => {
                  const flatIndex = results.indexOf(r);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => go(r.url)}
                      onMouseEnter={() => setSelected(flatIndex)}
                      className={cn(
                        'block w-full rounded-btn px-3 py-2.5 text-left transition-colors duration-100',
                        flatIndex === selected
                          ? 'bg-surface-raised text-ink'
                          : 'text-ink-muted',
                      )}
                    >
                      <span className="block truncate text-sm font-medium">
                        {r.title}
                      </span>
                      {r.description && (
                        <span className="mt-0.5 block truncate text-xs text-ink-faint">
                          {r.description}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[0.65rem] text-ink-faint">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
