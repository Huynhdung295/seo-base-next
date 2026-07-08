import type { Metadata } from "next";

import { env, absoluteUrl } from "@/lib/env";
import { siteConfig } from "@/lib/config";
import { SUPPORTED_LANGS } from "@/lib/constants/i18n";

// ─── Types ──────────────────────────────────────────────────

interface ConstructMetadataProps {
  /** Page title — will be appended with site name */
  title?: string;
  /** Meta description for SEO */
  description?: string;
  /** Open Graph image URL (absolute or relative) */
  image?: string;
  /** Canonical URL path (e.g., "/about") — WITHOUT lang prefix */
  canonicalPath?: string;
  /** Current language code (e.g., "en", "vi") */
  lang?: string;
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
 * Features:
 * - Dynamic title & description
 * - Open Graph + Twitter Card
 * - Hreflang alternates (critical for multi-lang SEO)
 * - Google/Bing Search Console verification
 * - Dynamic locale per language
 * - Canonical URL with language prefix
 *
 * @example
 * // In any page.tsx with generateMetadata:
 * export async function generateMetadata({ params }) {
 *   const { lang } = await params;
 *   return constructMetadata({
 *     title: "About Us",
 *     description: "Learn more about our company.",
 *     canonicalPath: "/about",
 *     lang,
 *   });
 * }
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.defaultOgImage,
  canonicalPath,
  lang,
  noIndex = false,
  keywords = [],
  overrides = {},
}: ConstructMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const ogImageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  // ─── Build canonical URL with language prefix ──────────
  const canonical = canonicalPath
    ? absoluteUrl(lang ? `/${lang}${canonicalPath === "/" ? "" : canonicalPath}` : canonicalPath)
    : undefined;

  // ─── Build hreflang alternates ─────────────────────────
  // Google uses these to understand language relationships
  const languageAlternates: Record<string, string> = {};
  if (canonicalPath) {
    for (const supportedLang of SUPPORTED_LANGS) {
      const langPath = canonicalPath === "/" ? "" : canonicalPath;
      languageAlternates[supportedLang] = absoluteUrl(`/${supportedLang}${langPath}`);
    }
    // x-default points to the canonical without lang prefix (for language selection page)
    languageAlternates["x-default"] = absoluteUrl(canonicalPath);
  }

  // ─── Resolve OG locale ────────────────────────────────
  const ogLocale = lang
    ? (siteConfig.locales[lang] || siteConfig.defaultLocale)
    : siteConfig.defaultLocale;

  // ─── Build verification object ─────────────────────────
  const verification: Metadata["verification"] = {};
  if (env.GOOGLE_SITE_VERIFICATION) {
    verification.google = env.GOOGLE_SITE_VERIFICATION;
  }
  if (env.BING_SITE_VERIFICATION) {
    verification.other = {
      ...verification.other,
      "msvalidate.01": env.BING_SITE_VERIFICATION,
    };
  }

  return {
    title: pageTitle,
    description,
    keywords,

    // ─── Canonical URL + Hreflang ────────────────────────
    ...(canonical && {
      alternates: {
        canonical,
        ...(Object.keys(languageAlternates).length > 0 && {
          languages: languageAlternates,
        }),
      },
    }),

    // ─── Open Graph ───────────────────────────────────────
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale,
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

    // ─── Search Console Verification ─────────────────────
    ...(Object.keys(verification).length > 0 && { verification }),

    // ─── Additional ───────────────────────────────────────
    metadataBase: new URL(env.SITE_URL),

    // ─── User Overrides ───────────────────────────────────
    ...overrides,
  };
}
