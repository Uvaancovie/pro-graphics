import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/7.x/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/quote',
        destination: '/price-beat',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
