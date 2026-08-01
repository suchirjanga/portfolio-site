import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Home"
      className="flex items-center gap-2.5"
    >
      <span className="grid size-7 place-items-center rounded-md border border-gold/30 bg-gold-tint font-mono text-[10px] text-gold">
        {'</>'}
      </span>
      <span className="text-sm font-semibold tracking-[0.18em] text-ink">
        {siteConfig.handle}
      </span>
    </Link>
  );
}
