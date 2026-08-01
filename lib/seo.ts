import { getSettings } from '@/lib/settings';

/** Absolute URL on the configured site origin. */
export function absoluteUrl(path: string): string {
  return new URL(path, getSettings().siteUrl).toString();
}

/**
 * URL of the generated OG image for a piece of content. Falls back to
 * this when no uploaded cover exists (SVG thumbnails are not
 * crawler-safe as OG images).
 */
export function ogImageUrl(title: string, meta?: string): string {
  const params = new URLSearchParams({ title: title.slice(0, 140) });
  if (meta) params.set('meta', meta.slice(0, 100));
  return `/og?${params.toString()}`;
}
