/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist', // This tells Next.js to output to the "dist" directory
  experimental: {
    // Remove appDir as it's deprecated in Next.js 14+
    esmExternals: true,
  },
  // Add other valid configurations here
};

module.exports = nextConfig;
