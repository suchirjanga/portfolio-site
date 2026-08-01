'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: React.ReactNode;
  /** Seconds before the reveal starts — used for stagger. */
  delay?: number;
  /** Animate on mount instead of on scroll (above-the-fold content). */
  immediate?: boolean;
  /** Rise distance in px. */
  y?: number;
  className?: string;
};

/**
 * Fade-rise reveal (successor to the legacy FadeRise): scroll-triggered
 * by default, mount-triggered with `immediate`. Falls back to a quick
 * fade when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  immediate = false,
  y = 20,
  className,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y };
  const visible = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };
  const transition = {
    duration: reduced ? 0.2 : 0.7,
    delay: reduced ? 0 : delay,
    ease: EASE,
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={hidden}
        animate={visible}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
