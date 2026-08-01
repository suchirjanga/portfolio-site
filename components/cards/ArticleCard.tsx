import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import CoverArt from '@/components/cards/CoverArt';
import type { PostMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

type Props = {
  post: PostMeta;
  /** Renders the cover strip on top (blog index); omit for compact grids. */
  withCover?: boolean;
};

export default function ArticleCard({ post, withCover = false }: Props) {
  const body = (
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div className="flex flex-wrap items-center gap-2">
        {post.featured && <Badge tone="gold">Featured</Badge>}
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
    </div>
  );

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card interactive flush className="flex h-full flex-col">
        {withCover &&
          (post.cover ? (
            <img
              src={post.cover}
              alt=""
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <CoverArt symbol={post.symbol} className="aspect-[16/9]" />
          ))}
        {body}
      </Card>
    </Link>
  );
}
