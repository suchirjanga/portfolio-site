import { type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useReducedMotion } from 'motion/react';
import { getProject } from '../content/projects';

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const reduced = useReducedMotion() ?? false;

  if (!project) {
    return (
      <main style={styles.missing}>
        <p style={styles.missingText}>That project could not be found.</p>
        <Link to="/" style={styles.backLink}>← Back to work</Link>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <motion.header
        style={styles.header}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: REVEAL_EASE }}
      >
        <Link to="/#work" style={styles.crumb}>
          ← Selected Work
        </Link>

        <div style={styles.headerInner}>
          <div style={styles.metaRow}>
            <span style={styles.role}>{project.role}</span>
            <span style={styles.year}>{project.year}</span>
          </div>

          <h1 style={styles.title}>{project.title}</h1>

          {project.description && (
            <p style={styles.description}>{project.description}</p>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div style={styles.links}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.outboundLink}
                >
                  Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.outboundLink}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </motion.header>

      <motion.figure
        style={styles.heroFigure}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: REVEAL_EASE }}
      >
        <img src={project.thumbnail} alt="" style={styles.heroImg} />
      </motion.figure>

      <motion.article
        className="prose"
        style={styles.article}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: REVEAL_EASE }}
      >
        <ReactMarkdown>{project.body}</ReactMarkdown>
      </motion.article>

      <footer style={styles.footer}>
        <Link to="/#work" style={styles.backLink}>
          ← Back to all work
        </Link>
      </footer>
    </main>
  );
}

const styles = {
  main: {
    width: '100%',
    padding: '120px clamp(20px, 4vw, 48px) 80px',
    maxWidth: 1080,
    margin: '0 auto',
  },
  missing: {
    minHeight: '60svh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 120,
    textAlign: 'center',
  },
  missingText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.4rem',
    color: 'rgba(245, 239, 230, 0.7)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    marginBottom: 64,
  },
  crumb: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.55)',
    textDecoration: 'none',
    alignSelf: 'flex-start',
  },
  headerInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  metaRow: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
  },
  role: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--amber)',
  },
  year: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    color: 'rgba(245, 239, 230, 0.5)',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
    lineHeight: 1.05,
    letterSpacing: '0.01em',
    color: 'var(--off-white)',
    margin: 0,
    maxWidth: '22ch',
  },
  description: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
    lineHeight: 1.55,
    color: 'rgba(245, 239, 230, 0.7)',
    margin: 0,
    maxWidth: '48ch',
  },
  links: {
    display: 'flex',
    gap: 20,
    marginTop: 8,
  },
  outboundLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--off-white)',
    textDecoration: 'none',
    padding: '12px 20px',
    border: '1px solid rgba(245, 239, 230, 0.25)',
    borderRadius: 2,
  },
  heroFigure: {
    margin: '0 0 64px 0',
    padding: 0,
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    borderRadius: 4,
    background: 'rgba(245, 239, 230, 0.04)',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  article: {
    margin: '0 auto',
  },
  footer: {
    marginTop: 96,
    paddingTop: 32,
    borderTop: '1px solid rgba(245, 239, 230, 0.1)',
  },
  backLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.65)',
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>;
