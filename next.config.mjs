/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel deployment with API routes, use default output (not 'export')
  // 'export' mode doesn't support API routes or server-side features

  images: {
    // Allow GitHub avatars
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },

  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Screen Savers',
  },
};

export default nextConfig;