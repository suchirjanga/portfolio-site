import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: ReactNode;
  delay?: number;
  amount?: number;
  yOffset?: number;
};

export default function FadeRise({
  children,
  delay = 0,
  amount = 0.3,
  yOffset = 24,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: yOffset }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduced ? 0 : 0.9,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
