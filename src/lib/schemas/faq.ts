import type { FAQPage, WithContext } from "schema-dts";

// ─── Types ──────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Generator ──────────────────────────────────────────────

/**
 * Generate a FAQPage JSON-LD schema.
 *
 * @example
 * const faqSchema = generateFAQSchema([
 *   {
 *     question: "How do I get started?",
 *     answer: "Simply clone the repo and run npm install.",
 *   },
 *   {
 *     question: "Is it free?",
 *     answer: "Yes, this is an open-source project under MIT license.",
 *   },
 * ]);
 *
 * // Use in a page:
 * <StructuredData schema={faqSchema} />
 */
export function generateFAQSchema(
  faqs: FAQItem[]
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}
