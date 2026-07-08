import type { Metadata } from "next";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/schemas/breadcrumb";
import { ContactUsView } from "@/views/contact-us/ContactUsView";

// ─── Dynamic Metadata (per language) ────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return constructMetadata({
    title: "Liên hệ",
    description: "Liên hệ với chúng tôi để được tư vấn và hỗ trợ nhanh nhất.",
    canonicalPath: "/contact-us",
    lang,
  });
}

// ─── Page ───────────────────────────────────────────────────

export default function ContactUsPage() {
  return (
    <>
      {/* ─── Structured Data (SEO) ─────────────────────────── */}
      <StructuredData
        schema={generateBreadcrumbSchema([
          { name: "Trang chủ", url: env.SITE_URL },
          { name: "Liên hệ", url: `${env.SITE_URL}/contact-us` },
        ])}
      />

      {/* ─── Page Content (UI) ─────────────────────────────── */}
      <ContactUsView />
    </>
  );
}
