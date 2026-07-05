import type { Organization, WithContext } from "schema-dts";

// ─── Types ──────────────────────────────────────────────────

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage?: string[];
  };
}

// ─── Generator ──────────────────────────────────────────────

/**
 * Generate an Organization JSON-LD schema.
 *
 * @example
 * const orgSchema = generateOrganizationSchema({
 *   name: "Your Company",
 *   url: "https://example.com",
 *   logo: "https://example.com/logo.png",
 *   description: "We build amazing products.",
 *   sameAs: [
 *     "https://facebook.com/yourcompany",
 *     "https://twitter.com/yourcompany",
 *   ],
 *   contactPoint: {
 *     telephone: "+84-xxx-xxx-xxx",
 *     contactType: "customer service",
 *     availableLanguage: ["Vietnamese", "English"],
 *   },
 * });
 *
 * // Use in a page:
 * <StructuredData schema={orgSchema} />
 */
export function generateOrganizationSchema(
  props: OrganizationSchemaProps
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: props.name,
    url: props.url,
    ...(props.logo && { logo: props.logo }),
    ...(props.description && { description: props.description }),
    ...(props.sameAs && { sameAs: props.sameAs }),
    ...(props.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint" as const,
        telephone: props.contactPoint.telephone,
        contactType: props.contactPoint.contactType,
        ...(props.contactPoint.availableLanguage && {
          availableLanguage: props.contactPoint.availableLanguage,
        }),
      },
    }),
  };
}
