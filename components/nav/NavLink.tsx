'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ICONS } from '@/components/nav/icons';
import type { NavItem } from '@/components/nav/items';
import { cn } from '@/lib/cn';

type Props = {
  item: NavItem;
  /** Called on click — lets the mobile drawer close itself. */
  onNavigate?: () => void;
};

export default function NavLink({ item, onNavigate }: Props) {
  const pathname = usePathname();
  const active =
    item.href === '/'
      ? pathname === '/'
      : pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = NAV_ICONS[item.icon];

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-3 rounded-btn px-3 py-2 text-sm transition-colors duration-200',
        active
          ? 'bg-gold-tint text-gold'
          : 'text-ink-muted hover:bg-surface-raised hover:text-ink',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute inset-y-2 left-0 w-0.5 rounded-full bg-gold transition-opacity duration-200',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
      <Icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}
