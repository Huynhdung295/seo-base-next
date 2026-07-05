import type { Thing, WithContext } from "schema-dts";

// ─── Types ──────────────────────────────────────────────────

interface StructuredDataProps<T extends Thing> {
  /** The JSON-LD schema object to render */
  schema: WithContext<T>;
}

// ─── Component ──────────────────────────────────────────────

/**
 * Render JSON-LD structured data in a <script> tag.
 * Use this component to add Schema.org markup to any page.
 *
 * @example
 * import { generateOrganizationSchema } from "@/lib/schemas/organization";
 *
 * <StructuredData schema={generateOrganizationSchema({
 *   name: "Your Company",
 *   url: "https://example.com",
 * })} />
 *
 * @example
 * import { generateFAQSchema } from "@/lib/schemas/faq";
 *
 * <StructuredData schema={generateFAQSchema([
 *   { question: "What is this?", answer: "A boilerplate." },
 * ])} />
 */
export function StructuredData<T extends Thing>({
  schema,
}: StructuredDataProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
