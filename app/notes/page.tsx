import Section from '@/components/ui/Section';

export const metadata = {
  title: 'Notes',
};

export default function NotesPage() {
  return (
    <main>
      <Section eyebrow="Notes" title="Learning notes">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          Short-form notes — DSA, AI, system design, cheat sheets — arrive in
          Phase 6.
        </p>
      </Section>
    </main>
  );
}
