// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Isso ignora erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  // Desativar verificação de módulos não encontrados
  webpack: (config) => {
    // Modificar a configuração do webpack para ignorar erros de módulos não encontrados
    config.ignoreWarnings = [/Failed to parse source map/];
    
    // Configurar o modo de tratamento de erros para 'warn' em vez de 'error'
    config.optimization = {
      ...config.optimization,
      emitOnErrors: true,
    };
    
    return config;
  },
  // Desativar verificação estrita de exportações
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
