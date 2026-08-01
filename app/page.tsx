import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export const metadata = {
  title: 'Design System Preview',
};

/**
 * Temporary Phase 1 page — exercises the design tokens and UI primitives
 * for review. Replaced by the real homepage in Phase 3.
 */
export default function DesignSystemPreview() {
  return (
    <main className="pb-24">
      <Container className="pt-8">
        <Badge tone="gold">Design system preview</Badge>
      </Container>

      <Section eyebrow="Typography" title="Type specimen">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Ideas, tutorials and thoughts on tech
            <span className="text-gold">.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
            In-depth articles on software development, AI, system design, and
            the things I learn while building. Set in Geist Sans with a Geist
            Mono accent for metadata and code.
          </p>
          <code className="w-fit rounded-btn border border-border bg-surface px-3 py-2 font-mono text-sm text-ink-muted">
            const stack = [&apos;Next.js&apos;, &apos;TypeScript&apos;,
            &apos;Tailwind&apos;] as const;
          </code>
        </div>
      </Section>

      <Section eyebrow="Color" title="Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: 'bg', className: 'bg-bg', hex: '#090909' },
            { name: 'surface', className: 'bg-surface', hex: '#101010' },
            {
              name: 'surface-raised',
              className: 'bg-surface-raised',
              hex: '#161614',
            },
            { name: 'ink', className: 'bg-ink', hex: '#F5EFE6' },
            { name: 'gold', className: 'bg-gold', hex: '#E2B64F' },
            {
              name: 'gold-bright',
              className: 'bg-gold-bright',
              hex: '#F0C866',
            },
            { name: 'gold-deep', className: 'bg-gold-deep', hex: '#B8893A' },
            {
              name: 'border',
              className: 'bg-border',
              hex: 'ink / 8%',
            },
          ].map((swatch) => (
            <div
              key={swatch.name}
              className="overflow-hidden rounded-card border border-border"
            >
              <div className={`h-16 ${swatch.className}`} />
              <div className="flex items-baseline justify-between bg-surface px-3 py-2">
                <span className="font-mono text-xs text-ink">
                  {swatch.name}
                </span>
                <span className="font-mono text-[0.65rem] text-ink-faint">
                  {swatch.hex}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Actions" title="Buttons & badges">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Read the blog</Button>
            <Button variant="secondary">View project</Button>
            <Button variant="ghost">All articles →</Button>
            <Button size="sm">Subscribe</Button>
            <Button variant="secondary" size="sm">
              Copy link
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone="gold">Featured</Badge>
            <Badge>Next.js</Badge>
            <Badge>TypeScript</Badge>
            <Badge>System Design</Badge>
            <Badge>RAG</Badge>
            <Badge>DSA</Badge>
          </div>
        </div>
      </Section>

      <Section eyebrow="Surfaces" title="Cards">
        <div className="grid gap-6 md:grid-cols-2">
          <Card interactive className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge tone="gold">Featured</Badge>
              <Badge>AI</Badge>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Understanding Embeddings: The Missing Intuition
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              A deep dive into embeddings, vector spaces, and why they power
              modern AI systems. Sample article card — real posts arrive in
              Phase 4.
            </p>
            <div className="mt-auto flex items-center gap-3 font-mono text-xs text-ink-faint">
              <span>Aug 1, 2026</span>
              <span aria-hidden>·</span>
              <span>8 min read</span>
            </div>
          </Card>

          <Card interactive flush className="flex flex-col">
            <img
              src="/projects/forge/thumbnail.svg"
              alt="Forge — project cover"
              className="aspect-video w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">Forge</h3>
                <span className="font-mono text-xs text-ink-faint">2026</span>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                A habit, recovery, and performance tracking platform that
                connects with fitness devices and health data.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Next.js</Badge>
                <Badge>Prisma</Badge>
                <Badge>Auth.js</Badge>
              </div>
              <div className="mt-2 flex gap-3">
                <Button size="sm" href="https://forge.sjanga.com">
                  Live ↗
                </Button>
                <Button variant="ghost" size="sm" href="/">
                  Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <footer className="border-t border-border pt-8">
        <Container>
          <p className="font-mono text-xs text-ink-faint">
            Temporary page — replaced by the real homepage in Phase 3.
          </p>
        </Container>
      </footer>
    </main>
  );
}
