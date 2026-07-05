import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * ✅ AUTO-GENERATED ROBOTS.TXT — Next.js Built-in API
 *
 * This file is automatically served at /robots.txt.
 * No post-build step needed — Next.js handles everything.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  };
}
