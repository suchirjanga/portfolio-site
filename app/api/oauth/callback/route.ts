import { NextRequest, NextResponse } from 'next/server';

/**
 * Decap CMS GitHub OAuth — step 2.
 * Exchanges the code for a token, verifies the GitHub account is the
 * allowed owner, then completes Decap's postMessage handshake with the
 * opener window.
 */

function popupHtml(script: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html><body><script>${script}</script></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

function errorHtml(message: string): NextResponse {
  const payload = JSON.stringify(JSON.stringify({ error: message }));
  return popupHtml(`
    (function () {
      function send(e) {
        window.opener.postMessage('authorization:github:error:' + ${payload}, e.origin);
      }
      window.addEventListener('message', send, { once: true });
      window.opener.postMessage('authorizing:github', '*');
    })();
  `);
}

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse('OAuth is not configured.', { status: 500 });
  }

  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const stateCookie = request.cookies.get('decap_oauth_state')?.value;
  if (!code || !state || state !== stateCookie) {
    return errorHtml('Invalid OAuth state. Close this window and retry.');
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const tokenJson: { access_token?: string; error_description?: string } =
    await tokenRes.json();
  const token = tokenJson.access_token;
  if (!token) {
    return errorHtml(tokenJson.error_description ?? 'Token exchange failed.');
  }

  // Hard allowlist: even with a valid GitHub login, only the owner may in.
  const allowed = process.env.ALLOWED_GITHUB_LOGIN;
  if (allowed) {
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user: { login?: string } = await userRes.json();
    if (user.login?.toLowerCase() !== allowed.toLowerCase()) {
      return errorHtml('This GitHub account is not allowed to use this CMS.');
    }
  }

  const success = JSON.stringify({ token, provider: 'github' });
  return popupHtml(`
    (function () {
      function send(e) {
        window.opener.postMessage(
          'authorization:github:success:' + ${JSON.stringify(success)},
          e.origin
        );
      }
      window.addEventListener('message', send, { once: true });
      window.opener.postMessage('authorizing:github', '*');
    })();
  `);
}
