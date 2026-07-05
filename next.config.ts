import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Performance ──────────────────────────────────────────
  // React Compiler (stable in Next.js 15)
  reactStrictMode: true,

  // ─── Image Optimization ───────────────────────────────────
  images: {
    // Add your image domains/remotePatterns here
    remotePatterns: [
      // Example:
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.com",
      // },
    ],
    // Use modern formats
    formats: ["image/avif", "image/webp"],
  },

  // ─── Headers for Performance & Security ───────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;