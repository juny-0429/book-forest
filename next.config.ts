import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ookfvortvsnjnubjfwgk.supabase.co',
      },
    ],
  },
};

export default nextConfig;
