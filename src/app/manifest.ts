import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

/**
 * ✅ Web App Manifest — Next.js Built-in API
 *
 * This file is automatically served at /manifest.webmanifest.
 * Provides metadata for PWA support, mobile "Add to homescreen",
 * and Lighthouse PWA score.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Add more icon sizes when available:
      // {
      //   src: "/icon-192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      // },
      // {
      //   src: "/icon-512.png",
      //   sizes: "512x512",
      //   type: "image/png",
      // },
    ],
  };
}
