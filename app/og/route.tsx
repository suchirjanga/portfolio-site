import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { getSettings } from '@/lib/settings';

/**
 * Generated Open Graph card: 1200×630, site tokens (near-black, warm
 * ink, gold accents). Used by every page that has no uploaded cover.
 */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get('title') ?? 'Suchir Janga').slice(0, 140);
  const meta = (searchParams.get('meta') ?? '').slice(0, 100);
  const host = new URL(getSettings().siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          backgroundColor: '#090909',
          color: '#F5EFE6',
          backgroundImage:
            'radial-gradient(circle at 18% 8%, rgba(226,182,79,0.14), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 46,
              height: 46,
              border: '2px solid rgba(226,182,79,0.45)',
              borderRadius: 10,
              color: '#E2B64F',
              fontSize: 20,
            }}
          >
            {'</>'}
          </div>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#E2B64F' }}>
            SJANGA
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 70 ? 52 : 64,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1020,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 24,
            color: 'rgba(245,239,230,0.62)',
          }}
        >
          <div style={{ display: 'flex' }}>{meta}</div>
          <div style={{ display: 'flex' }}>{host}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
