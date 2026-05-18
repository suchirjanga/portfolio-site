import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  cubicBezier,
} from 'motion/react';

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const EMAIL = 'suchirjanga.dev@gmail.com';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InquireModal({ isOpen, onClose }: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const focusables = getFocusables();
    focusables[0]?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const items = getFocusables();
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const onCopy = async () => {
    let copiedOk = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        copiedOk = true;
      }
    } catch {
      copiedOk = false;
    }
    if (!copiedOk && emailRef.current) {
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    setCopied(copiedOk);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      copyTimerRef.current = null;
    }, 1500);
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const backdropTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.2 };
  const panelTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: EASE };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={styles.backdrop}
          onClick={onBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            style={styles.panel}
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
            }
            transition={panelTransition}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              style={styles.closeBtn}
            >
              ×
            </button>
            <span id={labelId} style={styles.label}>
              GET IN TOUCH
            </span>
            <div style={styles.anchor} aria-hidden />
            <p style={styles.heroLine}>
              Open to selective freelance and full-time work.
            </p>
            <div style={styles.emailRow}>
              <a ref={emailRef} href={`mailto:${EMAIL}`} style={styles.email}>
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={onCopy}
                aria-live="polite"
                style={styles.copyBtn}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 1000,
    padding: 16,
  },
  panel: {
    position: 'relative',
    width: '100%',
    maxWidth: 460,
    background: '#0A0A0A',
    border: '1px solid rgba(245, 239, 230, 0.12)',
    borderRadius: 18,
    padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 6,
    right: 8,
    background: 'none',
    border: 'none',
    color: 'rgba(245, 239, 230, 0.6)',
    fontSize: 26,
    lineHeight: 1,
    cursor: 'pointer',
    padding: '10px 12px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: 12,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--amber)',
  },
  anchor: {
    width: 1,
    height: 40,
    background: 'var(--amber)',
    opacity: 0.3,
    margin: '20px 0',
  },
  heroLine: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
    color: 'var(--off-white)',
    lineHeight: 1.3,
    margin: 0,
    letterSpacing: '0.02em',
  },
  emailRow: {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 14,
    margin: '24px 0 0 0',
  },
  email: {
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    color: 'rgba(245, 239, 230, 0.75)',
    margin: 0,
    letterSpacing: '0.02em',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(184, 137, 58, 0.5)',
    paddingBottom: 2,
  },
  copyBtn: {
    background: 'none',
    border: 'none',
    padding: '4px 0',
    margin: 0,
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245, 239, 230, 0.55)',
    cursor: 'pointer',
  },
} satisfies Record<string, CSSProperties>;
