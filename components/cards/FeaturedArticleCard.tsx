import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import CoverArt from '@/components/cards/CoverArt';
import type { PostMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

type Props = {
  post: PostMeta;
};

export default function FeaturedArticleCard({ post }: Props) {
  return (
    <Link href="/blog" className="block">
      <Card interactive flush className="grid md:grid-cols-2">
        <CoverArt symbol={post.symbol} className="min-h-56 md:min-h-full" />
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="gold">Featured</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            {post.title}
          </h3>
          <p className="leading-relaxed text-ink-muted">{post.description}</p>
          <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <span className="mt-auto pt-2 text-sm font-medium text-gold">
            Read article →
          </span>
        </div>
      </Card>
    </Link>
  );
}
