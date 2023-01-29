/** @type {import('next').NextConfig} */




const nextConfig = {
  webpack: (config) => {
    // Realizar alterações no objeto de configuração do webpack aqui
    return config;
  },
  optimizeFonts: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
 
  images: {
    unoptimized: true,
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },


  
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/sobre': { page: '/sobre' },
      '/404': { page: '/404' },
      '/termosUso': { page: '/termosUso' }, 
      '/termosPrivacidade': { page: '/termosPrivacidade' },
      '/criarSala': { page: '/criarSala' },
      ...defaultPathMap
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 
  
}

module.exports = nextConfig

