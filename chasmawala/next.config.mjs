// chasmawala/next.config.mjs
/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  experimental: {
    serverActions: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: ["images.unsplash.com"],
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@middleware': path.resolve(__dirname, 'src/middleware'),
      '@models': path.resolve(__dirname, 'src/models'),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:5000" }, // ✅ Backend URL
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
