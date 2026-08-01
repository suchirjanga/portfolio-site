import Section from '@/components/ui/Section';

export const metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  return (
    <main>
      <Section eyebrow="Projects" title="Things I've built">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          Forge, Monolith, and Noire move into the new card language with
          detail pages in Phase 5.
        </p>
      </Section>
    </main>
  );
}
