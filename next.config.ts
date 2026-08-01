import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy Vite-era case-study URLs.
      {
        source: '/work/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Decap CMS admin (static app in public/admin).
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig;
