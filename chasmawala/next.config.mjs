// chasmawala/next.config.mjs
/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "frame-src 'self' https://www.google.com https://www.google.com/maps",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",

      // Images
      "img-src 'self' data: blob: https://placehold.co https://res.cloudinary.com https://images.unsplash.com",

      // Fonts
      "font-src 'self' data: https://fonts.gstatic.com",

      // Styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // Scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",

      // API + WebSockets
      "connect-src 'self' https://api.yourdomain.com https://vercel.live wss://*.vercel.live",

      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const corsHeaders = [
  { key: "Access-Control-Allow-Credentials", value: "true" },


  { key: "Access-Control-Allow-Origin", value: "*" },

  { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
];

const nextConfig = {
  experimental: {
    serverActions: {},
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  turbopack: {
    root: __dirname,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@middleware": path.resolve(__dirname, "src/middleware"),
      "@models": path.resolve(__dirname, "src/models"),
    };
    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...securityHeaders, ...corsHeaders],
      },
    ];
  },
};

export default nextConfig;
