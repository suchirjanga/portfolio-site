import { type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_HEIGHT = 64;

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  return (
    <header style={styles.header}>
      <nav style={styles.nav} aria-label="Primary">
        <Link to="/" style={styles.brand} aria-label="Home">
          <span style={styles.brandMark}>S</span>
        </Link>

        <div style={styles.links}>
          {onHome ? (
            <>
              <a href="#work" style={styles.link}>Work</a>
              <a href="#about" style={styles.link}>About</a>
              <a href="#contact" style={styles.link}>Contact</a>
            </>
          ) : (
            <Link to="/" style={styles.link}>← Back</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT,
    zIndex: 50,
    pointerEvents: 'none',
  },
  nav: {
    pointerEvents: 'auto',
    height: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 clamp(20px, 4vw, 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: 'var(--font-serif)',
    color: 'var(--off-white)',
    textDecoration: 'none',
    fontSize: 22,
    letterSpacing: '0.12em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    display: 'inline-block',
    width: 28,
    height: 28,
    lineHeight: '28px',
    textAlign: 'center',
    border: '1px solid rgba(245, 239, 230, 0.25)',
    borderRadius: '50%',
    fontSize: 14,
    fontFamily: 'var(--font-serif)',
  },
  links: {
    display: 'flex',
    gap: 'clamp(16px, 3vw, 32px)',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.7)',
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>;
