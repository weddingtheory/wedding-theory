import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/weddingtheory/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn0.weddingwire.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'weddingtheory.blr1.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'weddingtheory.blr1.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize JavaScript
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable React strict mode
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/weddings-1',
        destination: '/weddings',
        permanent: true,
      },
      {
        source: '/services-1',
        destination: '/lahza',
        permanent: true,
      },
      {
        source: '/photographs-1',
        destination: '/wedding_journal',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-src 'self' https://www.youtube.com https://youtube.com https://open.spotify.com https://*.spotify.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
