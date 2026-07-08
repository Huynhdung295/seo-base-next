import type { Metadata } from "next";

import { env } from "@/lib/env";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/schemas/breadcrumb";
import { BlogView } from "@/views/blog/BlogView";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  // TODO: Fetch data via slug

  return constructMetadata({
    title: `Detail ${slug}`,
    description: "Dynamic description",
    canonicalPath: `/blog/${slug}`,
    lang,
  });
}

export async function generateStaticParams() {
  // TODO: Fetch IDs from DB for SSG
  return []; 
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <StructuredData
        schema={generateBreadcrumbSchema([
          { name: "Home", url: env.SITE_URL },
          { name: "List", url: `${env.SITE_URL}/blog` },
          { name: slug, url: `${env.SITE_URL}/blog/${slug}` },
        ])}
      />
      <BlogView slug={slug} />
    </>
  );
}
