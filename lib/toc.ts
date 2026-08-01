import GithubSlugger from 'github-slugger';

export type TocEntry = {
  id: string;
  text: string;
  /** 2 for h2, 3 for h3. */
  depth: 2 | 3;
};

/**
 * Extracts h2/h3 headings from MDX source, skipping fenced code blocks.
 * Ids use github-slugger, matching what rehype-slug assigns at render.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, '');
    entries.push({
      id: slugger.slug(text),
      text,
      depth: match[1].length as 2 | 3,
    });
  }
  return entries;
}
