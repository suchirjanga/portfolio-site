import NoteCard from '@/components/cards/NoteCard';
import Reveal from '@/components/motion/Reveal';
import Section from '@/components/ui/Section';
import { getNotesByCategory } from '@/lib/notes';

export const metadata = {
  title: 'Notes',
  description:
    'Short learning notes — DSA patterns, AI, system design, and backend cheat sheets.',
};

export default function NotesPage() {
  const groups = getNotesByCategory();

  return (
    <main>
      <Section eyebrow="Notes" title="Learning notes">
        <p className="-mt-4 mb-10 max-w-xl leading-relaxed text-ink-muted">
          Short write-ups of things worth remembering — patterns, cheat
          sheets, and ideas. Smaller than articles, updated more often.
        </p>
        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <Reveal key={group.category}>
              <h3 className="mb-4 flex items-baseline gap-2.5 font-mono text-sm tracking-[0.18em] text-gold uppercase">
                {group.category}
                <span className="text-xs text-ink-faint">
                  {group.notes.length}
                </span>
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {group.notes.map((note) => (
                  <NoteCard key={note.slug} note={note} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
