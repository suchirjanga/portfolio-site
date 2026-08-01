import ArticleCard from '@/components/cards/ArticleCard';
import Section from '@/components/ui/Section';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
  description:
    'In-depth articles on software development, AI, system design, and the things I learn while building.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Section eyebrow="Blog" title="Ideas, tutorials and thoughts on tech">
        <p className="-mt-4 mb-10 max-w-xl leading-relaxed text-ink-muted">
          In-depth articles on software development, AI, system design, and
          the things I learn while building.
        </p>
        {posts.length === 0 ? (
          <p className="text-ink-muted">Nothing published yet — soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} withCover />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
