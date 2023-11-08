/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:6100/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
