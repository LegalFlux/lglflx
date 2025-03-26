/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose', // Modificado para melhor compatibilidade
    serverComponentsExternalPackages: ['@radix-ui/react-icons'], // Adicionado para resolver conflitos
    appDir: false // Defina como true se estiver usando App Router
  },
  
  // Configurações de Webpack para ESM
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    };
    
    // Adicionado para resolver problemas com Radix UI
    config.resolve.alias = {
      ...config.resolve.alias,
      '@radix-ui/react-icons': false // Desativa o processamento incorreto
    };
    
    return config;
  },

  // Configurações de imagens
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**' // Permite todas as imagens externas
      }
    ]
  },

  // Configurações de build
  typescript: {
    ignoreBuildErrors: false // Recomendado mudar para false em produção
  },
  eslint: {
    ignoreDuringBuilds: false // Recomendado mudar para false em produção
  },
  swcMinify: true,
  trailingSlash: false, // Melhor para SEO
  output: 'standalone' // Para deployments otimizados
};

module.exports = nextConfig;
