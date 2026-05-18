import { useState, type CSSProperties } from 'react';
import FadeRise from './FadeRise';
import InquireModal from './InquireModal';

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="contact" style={styles.section}>
        <div style={styles.inner}>
          <FadeRise>
            <span style={styles.label}>Contact</span>
          </FadeRise>

          <FadeRise delay={0.05}>
            <h2 style={styles.headline}>
              Have something quiet and considered in mind?
            </h2>
          </FadeRise>

          <FadeRise delay={0.1}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={styles.cta}
            >
              Get in touch
            </button>
          </FadeRise>

          <FadeRise delay={0.15}>
            <p style={styles.footnote}>
              © {new Date().getFullYear()} — Built with restraint.
            </p>
          </FadeRise>
        </div>
      </section>

      <InquireModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

const styles = {
  section: {
    width: '100%',
    minHeight: '70svh',
    padding: '120px clamp(20px, 4vw, 48px) 80px',
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    maxWidth: 1280,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.55)',
  },
  headline: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
    lineHeight: 1.1,
    letterSpacing: '0.01em',
    color: 'var(--off-white)',
    margin: 0,
    maxWidth: '18ch',
  },
  cta: {
    background: 'none',
    border: '1px solid rgba(245, 239, 230, 0.3)',
    color: 'var(--off-white)',
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    padding: '16px 28px',
    cursor: 'pointer',
    borderRadius: 2,
    transition: 'border-color 0.4s ease, color 0.4s ease',
  },
  footnote: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.2em',
    color: 'rgba(245, 239, 230, 0.4)',
    marginTop: 64,
  },
} satisfies Record<string, CSSProperties>;
