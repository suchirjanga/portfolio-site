import Section from '@/components/ui/Section';

export const metadata = {
  title: 'Resume',
};

export default function ResumePage() {
  return (
    <main>
      <Section eyebrow="Resume" title="Experience & education">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          The resume page is coming in a later phase — B.Tech CSE at GRIET,
          Hyderabad (2024–2028), building and shipping in public.
        </p>
      </Section>
    </main>
  );
}
