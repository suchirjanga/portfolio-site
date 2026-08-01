import Brand from '@/components/nav/Brand';
import NavLink from '@/components/nav/NavLink';
import SocialLinks from '@/components/nav/SocialLinks';
import ThemeToggle from '@/components/nav/ThemeToggle';
import { NAV_ITEMS } from '@/components/nav/items';
import SearchButton from '@/components/search/SearchButton';
import { getSettings } from '@/lib/settings';

export default function Sidebar() {
  const settings = getSettings();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-bg lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <Brand handle={settings.handle} />
      </div>

      <div className="px-3 pt-3">
        <SearchButton variant="sidebar" />
      </div>

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="flex shrink-0 items-center justify-between border-t border-border p-3">
        <SocialLinks github={settings.github} linkedin={settings.linkedin} />
        <ThemeToggle />
      </div>
    </aside>
  );
}
