// ─── Common Types ───────────────────────────────────────────

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

/**
 * Navigation link item.
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * SEO metadata for a page.
 */
export interface PageSEO {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * FAQ item for structured data.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generic feature/benefit item for landing page sections.
 */
export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

/**
 * Testimonial / social proof item.
 */
export interface TestimonialItem {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

/**
 * CTA (Call-to-Action) configuration.
 */
export interface CTAConfig {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}
