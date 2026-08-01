import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { PostMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

type Props = {
  post: PostMeta;
};

export default function ArticleCard({ post }: Props) {
  return (
    // Post pages arrive with the Phase 4 MDX pipeline; until then cards
    // land on the blog index.
    <Link href="/blog" className="block h-full">
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-balance">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 font-mono text-xs text-ink-faint">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </Card>
    </Link>
  );
}
