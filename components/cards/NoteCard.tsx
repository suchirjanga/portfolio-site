import Link from 'next/link';
import Card from '@/components/ui/Card';
import type { NoteMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

type Props = {
  note: NoteMeta;
};

export default function NoteCard({ note }: Props) {
  return (
    <Link href={`/notes/${note.slug}`} className="block h-full">
      <Card interactive className="flex h-full flex-col gap-2 p-5">
        <span className="font-mono text-xs tracking-wide text-gold uppercase">
          {note.category}
        </span>
        <h3 className="font-semibold tracking-tight">{note.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {note.summary}
        </p>
        <span className="mt-auto pt-2 font-mono text-xs text-ink-faint">
          {formatDate(note.date)}
        </span>
      </Card>
    </Link>
  );
}
