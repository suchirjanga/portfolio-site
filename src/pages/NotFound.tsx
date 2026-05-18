import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={styles.main}>
      <p style={styles.code}>404</p>
      <h1 style={styles.title}>Nothing here.</h1>
      <Link to="/" style={styles.link}>← Back home</Link>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '80svh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 40,
    textAlign: 'center',
  },
  code: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.3em',
    color: 'var(--amber)',
    margin: 0,
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    color: 'var(--off-white)',
    margin: 0,
  },
  link: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.65)',
    textDecoration: 'none',
    marginTop: 16,
  },
} satisfies Record<string, CSSProperties>;
