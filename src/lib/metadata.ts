import type { Metadata } from "next";

import { env, absoluteUrl } from "@/lib/env";
import { siteConfig } from "@/lib/config";

// ─── Types ──────────────────────────────────────────────────

interface ConstructMetadataProps {
  /** Page title — will be appended with site name */
  title?: string;
  /** Meta description for SEO */
  description?: string;
  /** Open Graph image URL (absolute or relative) */
  image?: string;
  /** Canonical URL path (e.g., "/about") */
  canonicalUrl?: string;
  /** Prevent search engines from indexing this page */
  noIndex?: boolean;
  /** Additional keywords for meta tags */
  keywords?: string[];
  /** Override any Metadata fields */
  overrides?: Partial<Metadata>;
}

// ─── Main Function ──────────────────────────────────────────

/**
 * Construct metadata object for Next.js `generateMetadata`.
 * Reusable across all routes for consistent SEO tags.
 *
 * @example
 * // In any page.tsx or layout.tsx:
 * export const metadata = constructMetadata({
 *   title: "About Us",
 *   description: "Learn more about our company.",
 *   canonicalUrl: "/about",
 * });
 *
 * // Or with generateMetadata for dynamic routes:
 * export async function generateMetadata({ params }) {
 *   const data = await fetchData(params.slug);
 *   return constructMetadata({
 *     title: data.title,
 *     description: data.excerpt,
 *     image: data.ogImage,
 *     canonicalUrl: `/${params.slug}`,
 *   });
 * }
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.defaultOgImage,
  canonicalUrl,
  noIndex = false,
  keywords = [],
  overrides = {},
}: ConstructMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const ogImageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const canonical = canonicalUrl ? absoluteUrl(canonicalUrl) : undefined;

  return {
    title: pageTitle,
    description,
    keywords,

    // ─── Canonical URL ────────────────────────────────────
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),

    // ─── Open Graph ───────────────────────────────────────
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },

    // ─── Twitter Card ─────────────────────────────────────
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImageUrl],
      // creator: "@yourhandle",
    },

    // ─── Robots ───────────────────────────────────────────
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ─── Additional ───────────────────────────────────────
    metadataBase: new URL(env.SITE_URL),

    // ─── User Overrides ───────────────────────────────────
    ...overrides,
  };
}
