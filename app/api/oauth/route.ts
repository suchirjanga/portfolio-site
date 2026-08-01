import { NextRequest, NextResponse } from 'next/server';

/**
 * Decap CMS GitHub OAuth — step 1.
 * The admin opens a popup here; we forward it to GitHub's authorize
 * screen with a CSRF state cookie. GitHub sends it back to
 * /api/oauth/callback.
 */
export function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      'OAuth is not configured: set OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET.',
      { status: 500 },
    );
  }

  const state = crypto.randomUUID();
  const callback = new URL('/api/oauth/callback', request.nextUrl.origin);

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', callback.toString());
  authorize.searchParams.set('scope', 'repo,user');
  authorize.searchParams.set('state', state);

  const response = NextResponse.redirect(authorize);
  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/api/oauth',
  });
  return response;
}
