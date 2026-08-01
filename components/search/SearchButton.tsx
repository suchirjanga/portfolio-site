'use client';

import { SearchIcon } from '@/components/nav/icons';
import { OPEN_SEARCH_EVENT } from '@/components/search/SearchDialog';

type Props = {
  /** "sidebar" renders the full input-like row; "icon" a compact button. */
  variant: 'sidebar' | 'icon';
};

export default function SearchButton({ variant }: Props) {
  const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

  const isMac =
    typeof navigator !== 'undefined' && /Mac|iP/.test(navigator.platform);

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
      >
        <SearchIcon className="size-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="flex w-full items-center gap-2.5 rounded-btn border border-border bg-surface px-3 py-2 text-sm text-ink-faint transition-colors duration-200 hover:border-border-strong hover:text-ink-muted"
    >
      <SearchIcon className="size-4 shrink-0" />
      <span>Search</span>
      <kbd
        suppressHydrationWarning
        className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem]"
      >
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}
