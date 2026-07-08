import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { SUPPORTED_LANGS } from "@/lib/constants/i18n";

/**
 * ✅ AUTO-GENERATED SITEMAP — Next.js Built-in API
 *
 * This file is automatically served at /sitemap.xml.
 * No post-build step needed — Next.js handles everything.
 *
 * Generates URLs for ALL supported languages with hreflang alternates,
 * which is critical for multi-language SEO.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

// ─── Helper ─────────────────────────────────────────────────

/**
 * Build language alternates for a given path.
 * Each entry maps a language code to its fully qualified URL.
 */
function buildLanguageAlternates(path: string): Record<string, string> {
  const baseUrl = env.SITE_URL;
  const alternates: Record<string, string> = {};

  for (const lang of SUPPORTED_LANGS) {
    const langPath = path === "/" ? "" : path;
    alternates[lang] = `${baseUrl}/${lang}${langPath}`;
  }

  // x-default: points to the URL without language prefix
  // This tells search engines which URL to show for unmatched languages
  alternates["x-default"] = `${baseUrl}${path}`;

  return alternates;
}

// ─── Sitemap Generator ─────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL;

  // ─── Define Static Routes ──────────────────────────────
  // Add all your static page paths here (WITHOUT lang prefix).
  const staticPaths = [
    "/",
    "/contact-us",
    // Uncomment and add more as you create pages:
    // "/about",
  ];

  // ─── Generate entries for each path × each language ────
  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    SUPPORTED_LANGS.map((lang) => ({
      url: `${baseUrl}/${lang}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1.0 : 0.8,
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    }))
  );

  // ─── Dynamic Routes (uncomment and customize) ──────────
  // const supabase = createServerSupabaseClient();
  // const { data: posts } = await supabase
  //   .from("posts")
  //   .select("slug, updated_at")
  //   .eq("published", true);
  //
  // const dynamicRoutes = (posts ?? []).flatMap((post) =>
  //   SUPPORTED_LANGS.map((lang) => ({
  //     url: `${baseUrl}/${lang}/blog/${post.slug}`,
  //     lastModified: new Date(post.updated_at),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.7,
  //     alternates: {
  //       languages: buildLanguageAlternates(`/blog/${post.slug}`),
  //     },
  //   }))
  // );

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ];
}
