import type { Metadata } from "next";
import { WelcomeText } from "@/components/common/WelcomeText";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateOrganizationSchema } from "@/lib/schemas/organization";
import { generateFAQSchema } from "@/lib/schemas/faq";

// ─── Metadata ───────────────────────────────────────────────

export const metadata: Metadata = constructMetadata({
  title: "Home",
  description: siteConfig.description,
  canonicalUrl: "/",
});

// ─── Page ───────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Structured Data ──────────────────────────────── */}
      <StructuredData
        schema={generateOrganizationSchema({
          name: siteConfig.organization.name,
          url: env.SITE_URL,
          description: siteConfig.organization.description,
          // logo: "https://example.com/logo.png",
          // sameAs: ["https://facebook.com/yourcompany"],
        })}
      />
      <StructuredData
        schema={generateFAQSchema([
          {
            question: "What is this boilerplate?",
            answer:
              "A Next.js landing page boilerplate optimized for Performance and Technical SEO.",
          },
          {
            question: "Is it free?",
            answer:
              "Yes, this is an open-source project for the community.",
          },
        ])}
      />

      {/* ─── Page Content ─────────────────────────────────── */}
      <main className="flex min-h-screen flex-col">
        {/* Hero Section placeholder */}
        <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-24 md:pt-32">
          <WelcomeText />
        </section>

        {/* Add your sections here */}
        {/* <HeroSection /> */}
        {/* <FeaturesSection /> */}
        {/* <CTASection /> */}
      </main>
    </>
  );
}
