import type { BreadcrumbList, WithContext } from "schema-dts";

// ─── Types ──────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

// ─── Generator ──────────────────────────────────────────────

/**
 * Generate a BreadcrumbList JSON-LD schema.
 * Helps search engines understand page hierarchy and display breadcrumbs in SERPs.
 *
 * @example
 * const breadcrumbSchema = generateBreadcrumbSchema([
 *   { name: "Home", url: "https://example.com" },
 *   { name: "About", url: "https://example.com/about" },
 * ]);
 *
 * // Use in a page:
 * <StructuredData schema={breadcrumbSchema} />
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
