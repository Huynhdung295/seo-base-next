// ─────────────────────────────────────────────────────────────
// 📌 SITE CONFIGURATION — Single source of truth
// ─────────────────────────────────────────────────────────────
// Edit this file ONCE for every new project.
// All components import from here — never hardcode site info elsewhere.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // ─── Basic Info ─────────────────────────────────────────
  name: "Your Site Name",
  description:
    "A modern landing page built with Next.js, optimized for performance and SEO.",
  defaultOgImage: "/og-image.png",

  // ─── Locale Mapping (per language) ─────────────────────
  // Used for OG locale tags and HTML lang attribute
  locales: {
    en: "en_US",
    vi: "vi_VN",
  } as Record<string, string>,

  // Default locale (fallback)
  defaultLocale: "vi_VN",

  // ─── Social Links ──────────────────────────────────────
  socials: {
    // facebook: "https://facebook.com/yourcompany",
    // twitter: "https://twitter.com/yourcompany",
    // instagram: "https://instagram.com/yourcompany",
    // linkedin: "https://linkedin.com/company/yourcompany",
    // youtube: "https://youtube.com/@yourcompany",
  } as Record<string, string>,

  // ─── Organization (JSON-LD Schema) ─────────────────────
  organization: {
    name: "Your Company",
    description: "Your company description here.",
    // logo: "https://example.com/logo.png",
    contactPoint: {
      telephone: "+84-xxx-xxx-xxx",
      contactType: "customer service",
      availableLanguage: ["Vietnamese", "English"],
    },
  },

  // ─── Navigation ────────────────────────────────────────
  // mainNav: [
  //   { label: "Trang chủ", href: "/" },
  //   { label: "Giới thiệu", href: "/about" },
  //   { label: "Liên hệ", href: "/contact" },
  // ],
} as const;

// ─── Type Export ────────────────────────────────────────────
export type SiteConfig = typeof siteConfig;
