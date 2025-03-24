// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Isso ignora erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  // Ignorar erros de webpack durante o build
  webpack: (config, { isServer }) => {
    // Ignorar erros de módulos não encontrados
    config.ignoreWarnings = [
      { module: /framer-motion/ },
      { module: /@\/components\/Button/ }
    ];
    return config;
  }
};

export default nextConfig;
