import Section from '@/components/ui/Section';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  return (
    <main>
      <Section eyebrow="Blog" title="Ideas, tutorials and thoughts on tech">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          Article cards, MDX rendering, syntax highlighting, and full-text
          search land here in Phase 4.
        </p>
      </Section>
    </main>
  );
}
