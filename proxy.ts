// proxy.ts (repo root, next to package.json)
// Next 16 renamed middleware.ts -> proxy.ts. Sets a per-request nonce CSP.
import { NextRequest, NextResponse } from 'next/server';

// Flip to false once a deploy preview runs clean (no CSP errors in the console).
// Report-Only doesn't block anything, and Observatory doesn't score it.
const REPORT_ONLY = false;

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const csp = [
    `default-src 'self'`,
    // 'strict-dynamic' lets the nonce'd Snipcart + Mailchimp loaders inject their
    // own <script> tags; the host list is only a fallback for old browsers.
    // 'unsafe-eval' is for Snipcart (also covers React dev mode).
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https://cdn.snipcart.com https://chimpstatic.com https://*.list-manage.com`,
    // Inline styles: Embla transforms, Snipcart, Mailchimp popup. Observatory doesn't penalize this.
    `style-src 'self' 'unsafe-inline' https://cdn.snipcart.com`,
    `img-src 'self' data: blob: https://www.datocms-assets.com https://cdn.snipcart.com https://*.list-manage.com https://*.mailchimp.com`,
    `media-src 'self' https://www.datocms-assets.com`,
    `font-src 'self' https://cdn.snipcart.com`,
    `connect-src 'self' https://app.snipcart.com https://cdn.snipcart.com https://payment.snipcart.com https://*.list-manage.com https://chimpstatic.com`,
    `frame-src https://ko-fi.com https://us16.list-manage.com https://payment.snipcart.com`,
    `form-action 'self' https://*.list-manage.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `frame-ancestors 'none'`, // replaces X-Frame-Options
    `upgrade-insecure-requests`,
  ].join('; ');

  const headerName = REPORT_ONLY
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';

  // Next reads the nonce from the *request* CSP header to stamp its own scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(headerName, csp);
  // For old browsers; frame-ancestors is what Observatory scores.
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

export const config = {
  matcher: [
    {
      // Skip static assets and the image optimizer.
      source:
        '/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|webmanifest)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};