import type { Metadata } from "next";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateOrganizationSchema } from "@/lib/schemas/organization";
import { generateWebSiteSchema } from "@/lib/schemas/website";
import { generateFAQSchema } from "@/lib/schemas/faq";
import { HomeView } from "@/views/home/HomeView";

// ─── Dynamic Metadata (per language) ────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return constructMetadata({
    title: "Home",
    description: siteConfig.description,
    canonicalPath: "/",
    lang,
  });
}

// ─── Page ───────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── Structured Data (SEO) ─────────────────────────── */}
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
        schema={generateWebSiteSchema({
          name: siteConfig.name,
          url: env.SITE_URL,
          description: siteConfig.description,
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

      {/* ─── Page Content (UI) ─────────────────────────────── */}
      {/* Devs will code the UI inside HomeView, leaving this file clean */}
      <HomeView />
    </>
  );
}
