import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import ArticleCard from '@/components/cards/ArticleCard';
import CoverArt from '@/components/cards/CoverArt';
import MdxContent from '@/components/mdx/MdxContent';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import { formatDate } from '@/lib/format';
import {
  getAdjacentPosts,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from '@/lib/posts';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, ogImageUrl } from '@/lib/seo';
import { getSettings } from '@/lib/settings';
import { extractToc } from '@/lib/toc';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image =
    post.cover || ogImageUrl(post.title, post.tags.join(' · '));
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.lastUpdated ?? post.date,
      authors: [post.author ?? getSettings().defaultAuthor],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = extractToc(post.body);
  const { newer, older } = getAdjacentPosts(slug);
  const related = getRelatedPosts(post);

  const settings = getSettings();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.lastUpdated ?? post.date,
          author: {
            '@type': 'Person',
            name: post.author ?? settings.defaultAuthor,
            url: settings.siteUrl,
          },
          image: absoluteUrl(
            post.cover || ogImageUrl(post.title, post.tags.join(' · ')),
          ),
          keywords: post.tags.join(', '),
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />
      <ReadingProgress />
      <main>
        <Container className="py-12 md:py-16">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
            <article className="min-w-0 max-w-3xl">
              <header className="flex flex-col gap-5">
                <Link
                  href="/blog"
                  className="link-underline w-fit font-mono text-xs tracking-[0.18em] text-ink-faint uppercase transition-colors duration-200 hover:text-ink"
                >
                  ← Blog
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.1]">
                  {post.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-faint">
                  <span>By {post.author ?? getSettings().defaultAuthor}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                  {post.lastUpdated && (
                    <>
                      <span aria-hidden>·</span>
                      <span>Updated {formatDate(post.lastUpdated)}</span>
                    </>
                  )}
                </div>
              </header>

              {post.cover ? (
                <img
                  src={post.cover}
                  alt=""
                  className="mt-8 aspect-[21/9] w-full rounded-card border border-border object-cover"
                />
              ) : (
                <CoverArt
                  symbol={post.symbol}
                  className="mt-8 aspect-[21/9] rounded-card border border-border"
                />
              )}

              <div className="mt-10">
                <MdxContent source={post.body} />
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
              </div>

              {(older || newer) && (
                <nav
                  aria-label="Adjacent articles"
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                >
                  {older ? (
                    <Link
                      href={`/blog/${older.slug}`}
                      className="group rounded-card border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong"
                    >
                      <span className="font-mono text-xs text-ink-faint">
                        ← Previous
                      </span>
                      <span className="mt-1.5 block text-sm font-medium text-ink-muted transition-colors duration-200 group-hover:text-ink">
                        {older.title}
                      </span>
                    </Link>
                  ) : (
                    <span aria-hidden />
                  )}
                  {newer && (
                    <Link
                      href={`/blog/${newer.slug}`}
                      className="group rounded-card border border-border bg-surface p-5 text-right transition-colors duration-200 hover:border-border-strong"
                    >
                      <span className="font-mono text-xs text-ink-faint">
                        Next →
                      </span>
                      <span className="mt-1.5 block text-sm font-medium text-ink-muted transition-colors duration-200 group-hover:text-ink">
                        {newer.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}

              {related.length > 0 && (
                <section aria-label="Related articles" className="mt-14">
                  <h2 className="mb-5 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
                    Related articles
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {related.map((r) => (
                      <ArticleCard key={r.slug} post={r} />
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-10">
                <TableOfContents entries={toc} />
              </div>
            </aside>
          </div>
        </Container>
      </main>
    </>
  );
}
