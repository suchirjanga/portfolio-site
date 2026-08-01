import type { NavIconName } from '@/components/nav/icons';

export type NavItem = {
  label: string;
  href: string;
  /** Icon name — resolved to a component inside client code (RSC-serializable). */
  icon: NavIconName;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Blog', href: '/blog', icon: 'blog' },
  { label: 'Projects', href: '/projects', icon: 'projects' },
  { label: 'Notes', href: '/notes', icon: 'notes' },
  { label: 'Resume', href: '/resume', icon: 'resume' },
  { label: 'Contact', href: '/contact', icon: 'contact' },
];
