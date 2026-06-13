import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import FadeRise from './FadeRise';

export default function SelectedWork() {
  return (
    <section id="work" style={styles.section}>
      <div style={styles.inner}>
        <FadeRise>
          <div style={styles.header}>
            <span style={styles.label}>Selected Work</span>
            <span style={styles.count}>
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </FadeRise>

        <ul style={styles.list}>
          {projects.map((p, i) => (
            <FadeRise key={p.slug} delay={i * 0.05}>
              <li className="work-card" style={styles.item}>
                <div style={styles.card}>
                  <div style={styles.thumbWrap}>
                    <img
                      className="work-thumb"
                      src={p.thumbnail}
                      alt={`${p.title} — project cover`}
                      loading="lazy"
                      style={styles.thumb}
                    />
                  </div>
                  <div style={styles.meta}>
                    <div style={styles.metaTop}>
                      <h3 style={styles.title}>{p.title}</h3>
                      <span style={styles.year}>{p.year}</span>
                    </div>
                    <p style={styles.role}>{p.role}</p>
                    <p style={styles.desc}>{p.description}</p>
                    <div style={styles.actions}>
                      {p.liveUrl ? (
                        <a
                          className="work-cta"
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.viewLink}
                          aria-label={`View ${p.title} — opens the live site in a new tab`}
                        >
                          View Project →
                        </a>
                      ) : (
                        <Link
                          className="work-cta"
                          to={`/work/${p.slug}`}
                          style={styles.viewLink}
                        >
                          View Project →
                        </Link>
                      )}
                      <Link
                        className="work-details"
                        to={`/work/${p.slug}`}
                        style={styles.detailsLink}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </FadeRise>
          ))}
        </ul>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    width: '100%',
    padding: '40px clamp(20px, 4vw, 48px) 120px',
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '0 0 40px 0',
    borderBottom: '1px solid rgba(245, 239, 230, 0.12)',
    marginBottom: 24,
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.6)',
  },
  count: {
    fontFamily: 'var(--font-serif)',
    fontSize: 14,
    color: 'rgba(245, 239, 230, 0.5)',
    letterSpacing: '0.1em',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    borderBottom: '1px solid rgba(245, 239, 230, 0.08)',
  },
  card: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
    gap: 'clamp(24px, 5vw, 64px)',
    alignItems: 'center',
    padding: 'clamp(32px, 5vw, 56px) 0',
    textDecoration: 'none',
    color: 'inherit',
  },
  thumbWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 3',
    overflow: 'hidden',
    background: 'rgba(245, 239, 230, 0.04)',
    borderRadius: 4,
  },
  thumb: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  metaTop: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 24,
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    letterSpacing: '0.01em',
    lineHeight: 1.1,
    color: 'var(--off-white)',
    margin: 0,
  },
  year: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.18em',
    color: 'rgba(245, 239, 230, 0.5)',
    flexShrink: 0,
  },
  role: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--amber)',
    margin: 0,
  },
  desc: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
    lineHeight: 1.6,
    color: 'rgba(245, 239, 230, 0.65)',
    margin: '4px 0 0 0',
    maxWidth: '46ch',
  },
  actions: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 20,
    marginTop: 8,
  },
  viewLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.55)',
    textDecoration: 'none',
  },
  detailsLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.32)',
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>;
