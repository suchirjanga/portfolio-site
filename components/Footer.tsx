import Link from 'next/link';
import Brand from '@/components/nav/Brand';
import Container from '@/components/ui/Container';
import { getSettings } from '@/lib/settings';

const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Notes', href: '/notes' },
] as const;

const MORE = [
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  const settings = getSettings();

  return (
    <footer className="mt-16 border-t border-border">
      <Container className="flex flex-col gap-10 py-12">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-4">
            <Brand handle={settings.handle} />
            <p className="text-sm leading-relaxed text-ink-muted">
              {settings.footerText}
            </p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Pages" className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
                Pages
              </span>
              {PAGES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline w-fit text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav aria-label="More" className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
                More
              </span>
              {MORE.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline w-fit text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={settings.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline w-fit text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                GitHub
              </a>
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline w-fit text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href="/feed.xml"
                className="link-underline w-fit text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                RSS
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-ink-faint">
          <span>
            © {new Date().getFullYear()} {settings.siteTitle}
          </span>
          <span>{settings.copyrightText}</span>
        </div>
      </Container>
    </footer>
  );
}
