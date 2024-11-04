import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ik.imagekit.io', 'cdn0.weddingwire.in', 'ik.imagekit.io'],
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
