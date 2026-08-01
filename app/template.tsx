'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Page transition: templates remount per navigation, so every route
 * change gets a quiet fade-rise in. Enter-only by design — exit
 * animations are deliberately avoided (App Router doesn't support them
 * and they hold stale content on screen).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
