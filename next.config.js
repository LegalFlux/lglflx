/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Remove appDir as it's deprecated in Next.js 14+
    esmExternals: true,
  },
  // Add other valid configurations here
};

module.exports = nextConfig;
