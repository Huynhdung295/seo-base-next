import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// ─── UTILS ──────────────────────────────────────────────────

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());
}

// ─── TEMPLATES ──────────────────────────────────────────────

function generateStaticPageCode(routePath, viewComponentName, viewImportPath) {
  return `import type { Metadata } from "next";

import { env } from "@/lib/env";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/schemas/breadcrumb";
import { ${viewComponentName} } from "${viewImportPath}";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return constructMetadata({
    title: "${capitalize(path.basename(routePath))}",
    description: "Description for ${routePath}",
    canonicalPath: "${routePath}",
    lang,
  });
}

export default function Page() {
  return (
    <>
      <StructuredData
        schema={generateBreadcrumbSchema([
          { name: "Home", url: env.SITE_URL },
          { name: "${capitalize(path.basename(routePath))}", url: \`\${env.SITE_URL}${routePath}\` },
        ])}
      />
      <${viewComponentName} />
    </>
  );
}
`;
}

function generateDynamicPageCode(routePath, paramName, viewComponentName, viewImportPath) {
  return `import type { Metadata } from "next";

import { env } from "@/lib/env";
import { constructMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/common/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/schemas/breadcrumb";
import { ${viewComponentName} } from "${viewImportPath}";

type PageProps = {
  params: Promise<{ lang: string; ${paramName}: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, ${paramName} } = await params;

  // TODO: Fetch data via ${paramName}

  return constructMetadata({
    title: \`Detail \${${paramName}}\`,
    description: "Dynamic description",
    canonicalPath: \`${routePath.replace(`[${paramName}]`, '')}\${${paramName}}\`,
    lang,
  });
}

export async function generateStaticParams() {
  // TODO: Fetch IDs from DB for SSG
  return []; 
}

export default async function Page({ params }: PageProps) {
  const { ${paramName} } = await params;

  return (
    <>
      <StructuredData
        schema={generateBreadcrumbSchema([
          { name: "Home", url: env.SITE_URL },
          { name: "List", url: \`\${env.SITE_URL}${routePath.split('/[')[0]}\` },
          { name: ${paramName}, url: \`\${env.SITE_URL}${routePath.replace(`[${paramName}]`, '')}\${${paramName}}\` },
        ])}
      />
      <${viewComponentName} ${paramName}={${paramName}} />
    </>
  );
}
`;
}

function generateViewCode(viewComponentName, paramName = null) {
  const propsInterface = paramName
    ? `\ninterface ${viewComponentName}Props {\n  ${paramName}: string;\n}\n`
    : '';

  const componentSignature = paramName
    ? `export function ${viewComponentName}({ ${paramName} }: ${viewComponentName}Props) {`
    : `export function ${viewComponentName}() {`;

  const heading = paramName 
    ? `{${paramName}}`
    : `${viewComponentName.replace('View', '')}`;

  return `import { ViewWrapper } from "@/views/_shared/ViewWrapper";
${propsInterface}
export ${componentSignature.replace('export ', '')}
  return (
    <ViewWrapper>
      <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-24 md:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl">
          ${heading}
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Generated view component
        </p>
      </section>
    </ViewWrapper>
  );
}
`;
}

// ─── MAIN ───────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  let routePath = args[0];

  if (!routePath) {
    console.error("Error: Route path is required.");
    console.error("Example: npm run create:route /about-us");
    process.exit(1);
  }

  if (!routePath.startsWith('/')) {
    routePath = '/' + routePath;
  }

  const paramMatch = routePath.match(/\[([a-zA-Z0-9_]+)\]/);
  const isDynamic = !!paramMatch;
  const paramName = isDynamic ? paramMatch[1] : null;

  const parts = routePath.split('/').filter(Boolean);
  const lastStaticPart = [...parts].reverse().find(p => !p.includes('[')) || 'Page';
  const viewComponentName = toPascalCase(lastStaticPart) + 'View';

  const appDirPath = path.join(ROOT_DIR, 'src', 'app', '[lang]', ...parts);
  const viewDirPath = path.join(ROOT_DIR, 'src', 'views', lastStaticPart);
  
  const pageFilePath = path.join(appDirPath, 'page.tsx');
  const viewFilePath = path.join(viewDirPath, `${viewComponentName}.tsx`);

  if (fs.existsSync(pageFilePath)) {
    console.error(`Error: Route file already exists: ${pageFilePath}`);
    process.exit(1);
  }
  if (fs.existsSync(viewFilePath)) {
    console.error(`Error: View file already exists: ${viewFilePath}`);
    process.exit(1);
  }

  fs.mkdirSync(appDirPath, { recursive: true });
  fs.mkdirSync(viewDirPath, { recursive: true });

  const viewImportPath = `@/views/${lastStaticPart}/${viewComponentName}`;
  const pageCode = isDynamic 
    ? generateDynamicPageCode(routePath, paramName, viewComponentName, viewImportPath)
    : generateStaticPageCode(routePath, viewComponentName, viewImportPath);
  
  const viewCode = generateViewCode(viewComponentName, paramName);

  fs.writeFileSync(pageFilePath, pageCode, 'utf-8');
  fs.writeFileSync(viewFilePath, viewCode, 'utf-8');

  console.log(`\nRoute created successfully: ${routePath}`);
  console.log(`Files generated:`);
  console.log(`- src/app/[lang]${routePath}/page.tsx`);
  console.log(`- src/views/${lastStaticPart}/${viewComponentName}.tsx\n`);
  
  if (isDynamic) {
    console.log(`Note for dynamic routes:`);
    console.log(`Update generateStaticParams() in page.tsx to enable SSG.\n`);
  }

  console.log(`Sitemap update required:`);
  console.log(`Add "${routePath}" to staticPaths in src/app/sitemap.ts if applicable.\n`);
}

main();
