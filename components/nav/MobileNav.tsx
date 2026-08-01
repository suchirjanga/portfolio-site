'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Brand from '@/components/nav/Brand';
import NavLink from '@/components/nav/NavLink';
import SocialLinks from '@/components/nav/SocialLinks';
import ThemeToggle from '@/components/nav/ThemeToggle';
import { CloseIcon, MenuIcon } from '@/components/nav/icons';
import { NAV_ITEMS } from '@/components/nav/items';
import SearchButton from '@/components/search/SearchButton';
import { cn } from '@/lib/cn';

/*
  The drawer stays mounted and animates with CSS transforms; when closed it
  is inert, invisible to pointers, and off-screen. AnimatePresence exit
  unmounting is unreliable under React 19.2 + Next 15 (elements finished
  their exit but were never removed, leaving a full-screen z-50 backdrop
  swallowing every tap), so exit-based Framer patterns are avoided here.
*/
type Props = {
  /** CMS-managed values passed from the server layout. */
  handle?: string;
  github?: string;
  linkedin?: string;
};

export default function MobileNav({ handle, github, linkedin }: Props) {
  const pathname = usePathname();
  // The drawer is open only on the route it was opened on, so navigating
  // (links, back button) closes it without any effect-driven state sync.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const close = () => setOpenedOn(null);

  useEffect(() => {
    if (!open) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedOn(null);
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur lg:hidden">
        <Brand handle={handle} />
        <div className="flex items-center gap-1">
          <SearchButton variant="icon" />
          <button
            type="button"
            onClick={() => setOpenedOn(pathname)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </header>

      <div
        aria-hidden
        onClick={close}
        className={cn(
          'fixed inset-0 z-50 bg-overlay transition-opacity duration-300 lg:hidden motion-reduce:transition-none',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        inert={!open}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-bg transition-transform duration-300 ease-(--ease-out-expo) lg:hidden motion-reduce:transition-none',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <Brand onNavigate={close} handle={handle} />
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} onNavigate={close} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-between border-t border-border p-3">
          <SocialLinks github={github} linkedin={linkedin} />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
