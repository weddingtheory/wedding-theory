import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/weddings-1',
        destination: '/weddings', // Assuming this is your new correct path
        permanent: true, // This sends a 308 status code, telling search engines this is a permanent redirect
      },
      // Add more old URLs that need to be redirected
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // }
      {
        source: '/services-1',
        destination: '/lahza',
        permanent: true,
      },
      {
        source: '/photographs-1',
        destination: '/blogs',
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
            value: "frame-src 'self' https://www.youtube.com https://youtube.com https://open.spotify.com https://*.spotify.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
