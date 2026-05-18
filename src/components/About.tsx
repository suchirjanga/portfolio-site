import { type CSSProperties } from 'react';
import FadeRise from './FadeRise';

export default function About() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.inner}>
        <FadeRise>
          <span style={styles.label}>About</span>
        </FadeRise>

        <FadeRise delay={0.1}>
          <p style={styles.body}>
            I'm a B.Tech student at GRIET, Hyderabad (2024–2028). I haven't
            locked in a career direction yet, and I'm fine with that —
            what's stayed constant is that I like to build. Not for a
            specific payoff or because I've picked a lane, but because
            making something and watching it work is the part I actually
            enjoy. So I build things — sometimes useful, sometimes just
            for myself.
          </p>
        </FadeRise>
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: '100%',
    padding: '80px clamp(20px, 4vw, 48px) 80px',
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.2fr)',
    gap: 'clamp(24px, 6vw, 80px)',
    alignItems: 'start',
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.55)',
  },
  lede: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
    lineHeight: 1.35,
    color: 'var(--off-white)',
    margin: 0,
    maxWidth: '32ch',
  },
  body: {
    gridColumn: '2',
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'clamp(0.98rem, 1.2vw, 1.05rem)',
    lineHeight: 1.7,
    color: 'rgba(245, 239, 230, 0.7)',
    margin: '24px 0 0 0',
    maxWidth: '52ch',
  },
} satisfies Record<string, CSSProperties>;
