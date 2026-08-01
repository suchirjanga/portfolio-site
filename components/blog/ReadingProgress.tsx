'use client';

import { useEffect, useRef } from 'react';

/**
 * Thin gold bar under the top edge showing scroll progress through the
 * page. Drives a ref directly (no state) so scrolling never re-renders.
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-14 z-30 h-0.5 lg:top-0 lg:left-60"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gold"
      />
    </div>
  );
}
