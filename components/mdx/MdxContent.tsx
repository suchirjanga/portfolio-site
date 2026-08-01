import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';
import Callout from '@/components/mdx/Callout';

const prettyCodeOptions: PrettyCodeOptions = {
  // Warm amber-on-black theme; background comes from our own tokens so
  // code blocks stay dark in both site themes.
  theme: 'vesper',
  keepBackground: false,
};

const components = {
  Callout,
  // Markdown images: lazy + async decode by default; alt comes from the
  // author's ![alt](src) text.
  img: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <img loading="lazy" decoding="async" {...props} />
  ),
};

/** Server component: compiles MDX source with GFM, heading ids, and shiki. */
export default async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components,
  });

  return <div className="prose">{content}</div>;
}
