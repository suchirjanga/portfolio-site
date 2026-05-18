import { type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutHero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <motion.h1
          style={styles.headline}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.15, ease: REVEAL_EASE }}
        >
          Suchir Janga
        </motion.h1>

        <motion.p
          style={styles.lede}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: REVEAL_EASE }}
        >
          Still figuring out the path — sure about the building.
        </motion.p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '120px clamp(20px, 4vw, 48px) 80px',
  },
  inner: {
    maxWidth: 1280,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  headline: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(3rem, 11vw, 9.5rem)',
    letterSpacing: '0.02em',
    lineHeight: 1.0,
    color: 'var(--off-white)',
    margin: 0,
  },
  lede: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
    lineHeight: 1.55,
    color: 'rgba(245, 239, 230, 0.7)',
    maxWidth: '40ch',
    margin: 0,
  },
} satisfies Record<string, CSSProperties>;
