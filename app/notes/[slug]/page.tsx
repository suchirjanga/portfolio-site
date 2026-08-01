import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MdxContent from '@/components/mdx/MdxContent';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import { formatDate } from '@/lib/format';
import { getAllNotes, getNote } from '@/lib/notes';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const siblings = getAllNotes()
    .filter((n) => n.category === note.category && n.slug !== note.slug)
    .slice(0, 3);

  return (
    <main>
      <Container className="max-w-3xl py-12 md:py-16">
        <article>
          <header className="flex flex-col gap-4">
            <Link
              href="/notes"
              className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase transition-colors duration-200 hover:text-ink"
            >
              ← Notes
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">{note.category}</Badge>
              {note.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              <span className="font-mono text-xs text-ink-faint">
                {formatDate(note.date)} · {note.readingMinutes} min
                {note.lastUpdated && ` · Updated ${formatDate(note.lastUpdated)}`}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {note.title}
            </h1>
            {note.summary && (
              <p className="text-lg leading-relaxed text-ink-muted">
                {note.summary}
              </p>
            )}
          </header>

          {note.cover && (
            <img
              src={note.cover}
              alt=""
              className="mt-8 aspect-[21/9] w-full rounded-card border border-border object-cover"
            />
          )}

          <div className="mt-8">
            <MdxContent source={note.body} />
          </div>

          {siblings.length > 0 && (
            <footer className="mt-12 border-t border-border pt-6">
              <h2 className="mb-3 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
                More {note.category}
              </h2>
              <ul className="flex flex-col gap-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/notes/${s.slug}`}
                      className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                    >
                      {s.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </footer>
          )}
        </article>
      </Container>
    </main>
  );
}
