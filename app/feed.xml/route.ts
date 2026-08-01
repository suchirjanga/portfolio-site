import { getAllPosts } from '@/lib/posts';
import { getSettings } from '@/lib/settings';

// Prerendered at build time; regenerates on every publish (CMS commits
// trigger a rebuild).
export const dynamic = 'force-static';

function esc(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function GET() {
  const settings = getSettings();
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${settings.siteUrl}/blog/${post.slug}`;
      return [
        '<item>',
        `<title>${esc(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `<description>${esc(post.excerpt || post.description)}</description>`,
        ...post.tags.map((tag) => `<category>${esc(tag)}</category>`),
        '</item>',
      ].join('');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(settings.siteTitle)} — Blog</title>
<link>${settings.siteUrl}</link>
<atom:link href="${settings.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
<description>${esc(settings.description)}</description>
<language>en</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
