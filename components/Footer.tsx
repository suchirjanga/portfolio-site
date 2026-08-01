import Link from 'next/link';
import Brand from '@/components/nav/Brand';
import Container from '@/components/ui/Container';
import { siteConfig } from '@/lib/site';

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
  return (
    <footer className="mt-16 border-t border-border">
      <Container className="flex flex-col gap-10 py-12">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-4">
            <Brand />
            <p className="text-sm leading-relaxed text-ink-muted">
              Building in public — sharing what I learn about code, systems,
              and everything in between.
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
                  className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
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
                  className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-ink-faint">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>Built with restraint.</span>
        </div>
      </Container>
    </footer>
  );
}
