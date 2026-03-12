import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: 'https://istiyaq.com/about',
        permanent: true,
      },
      {
        source: '/contact',
        destination: 'https://istiyaq.com/contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: 'https://istiyaq.com/services',
        permanent: true,
      },
      {
        source: '/work',
        destination: 'https://istiyaq.com/work',
        permanent: true,
      },
      {
        source: '/blog/blog/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
