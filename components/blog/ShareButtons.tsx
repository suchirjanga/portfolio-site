'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  title: string;
  /** Path of the page being shared, e.g. /blog/my-post. */
  path: string;
};

const linkClass =
  'rounded-btn border border-border-strong bg-surface px-3.5 py-2 text-xs font-medium text-ink-muted transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright';

export default function ShareButtons({ title, path }: Props) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  // Absolute URL is only known in the browser until Phase 9 wires
  // metadataBase; window.location keeps this correct on previews too.
  const url = () => new URL(path, window.location.origin).toString();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — the share links still work.
    }
  };

  const shareX = () => {
    const u = new URL('https://twitter.com/intent/tweet');
    u.searchParams.set('text', title);
    u.searchParams.set('url', url());
    window.open(u, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    const u = new URL('https://www.linkedin.com/sharing/share-offsite/');
    u.searchParams.set('url', url());
    window.open(u, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
        Share
      </span>
      <button type="button" onClick={copy} className={linkClass} aria-live="polite">
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      <button type="button" onClick={shareX} className={linkClass}>
        X
      </button>
      <button type="button" onClick={shareLinkedIn} className={linkClass}>
        LinkedIn
      </button>
      <a href={`mailto:?subject=${encodeURIComponent(title)}`} className={linkClass}>
        Email
      </a>
    </div>
  );
}
