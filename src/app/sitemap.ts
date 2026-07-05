import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * ✅ AUTO-GENERATED SITEMAP — Next.js Built-in API
 *
 * This file is automatically served at /sitemap.xml.
 * No post-build step needed — Next.js handles everything.
 *
 * For dynamic routes (e.g., blog posts), fetch slugs from your CMS/DB
 * and merge them into the returned array.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL;

  // ─── Static Routes ─────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Uncomment and add more as you create pages:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];

  // ─── Dynamic Routes (uncomment and customize) ──────────
  // const supabase = createServerSupabaseClient();
  // const { data: posts } = await supabase
  //   .from("posts")
  //   .select("slug, updated_at")
  //   .eq("published", true);
  //
  // const dynamicRoutes = (posts ?? []).map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updated_at),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ];
}
