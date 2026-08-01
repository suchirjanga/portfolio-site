import { buildSearchDocs } from '@/lib/search-data';

// Prerendered at build time — the index is a static asset.
export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildSearchDocs());
}
