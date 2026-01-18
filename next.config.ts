import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ftp.goit.study' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
