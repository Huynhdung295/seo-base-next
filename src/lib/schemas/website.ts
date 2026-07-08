import type { WebSite, WithContext } from "schema-dts";

// ─── Types ──────────────────────────────────────────────────

interface WebSiteSchemaProps {
  name: string;
  url: string;
  description?: string;
  /** Enable Google sitelinks search box */
  searchAction?: {
    /** Search URL template with {search_term_string} placeholder */
    targetUrl: string;
  };
}

// ─── Generator ──────────────────────────────────────────────

/**
 * Generate a WebSite JSON-LD schema.
 * Helps Google understand your site and potentially show sitelinks search box.
 *
 * @example
 * const websiteSchema = generateWebSiteSchema({
 *   name: "Your Site",
 *   url: "https://example.com",
 *   description: "A modern landing page.",
 *   searchAction: {
 *     targetUrl: "https://example.com/search?q={search_term_string}",
 *   },
 * });
 *
 * // Use in a page:
 * <StructuredData schema={websiteSchema} />
 */
export function generateWebSiteSchema(
  props: WebSiteSchemaProps
): WithContext<WebSite> {
  const base: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: props.name,
    url: props.url,
    ...(props.description && { description: props.description }),
  };

  if (props.searchAction) {
    // "query-input" is a valid Schema.org property but not in schema-dts strict types.
    // We use Object.assign to bypass TypeScript's excess property check
    // while keeping the output JSON-LD valid for Google.
    base.potentialAction = Object.assign(
      {
        "@type": "SearchAction" as const,
        target: props.searchAction.targetUrl,
      },
      { "query-input": "required name=search_term_string" }
    );
  }

  return base;
}
