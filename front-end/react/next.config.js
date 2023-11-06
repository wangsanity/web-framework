/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fastermindtech.uk/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
