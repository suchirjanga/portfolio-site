import Link from 'next/link';
import { siteConfig } from '@/lib/site';

type Props = {
  onNavigate?: () => void;
  /** Brand wordmark — CMS-managed via Site Settings; static fallback. */
  handle?: string;
};

export default function Brand({ onNavigate, handle = siteConfig.handle }: Props) {
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
        {handle}
      </span>
    </Link>
  );
}
