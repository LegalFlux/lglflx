/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper output
  poweredByHeader: false,
  // Ensure routes manifest is generated
  experimental: {
    // Any experimental features you might need
  },
  // Ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
};

module.exports = nextConfig;
