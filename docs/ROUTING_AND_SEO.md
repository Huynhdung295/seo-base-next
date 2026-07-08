# Routing & SEO Guide

This guide explains how to create new pages in `base-seo-next` following the framework architecture and Technical SEO standards.

## 1. Architecture (Views Pattern)

Routing and UI are strictly separated:

- `src/app/[lang]/[route]/page.tsx`: For SEO setup only (Metadata, Structured Data, i18n). No UI code here.
- `src/views/[route]/[Route]View.tsx`: The UI component. Receives data from `page.tsx`.

## 2. Generating New Pages (Recommended)

To avoid missing SEO configuration, use the CLI generator.

### A. Static Routes
Example for `/about-us`:

```bash
npm run create:route "/about-us"
```

Result:
- `src/app/[lang]/about-us/page.tsx` is generated with standard metadata.
- `src/views/about-us/AboutUsView.tsx` is generated for UI code.
- Terminal prompts to add `"/about-us"` to `src/app/sitemap.ts`.

### B. Dynamic Routes
Example for `/blog/[slug]`:

```bash
npm run create:route "/blog/[slug]"
```

Result:
- Creates `src/app/[lang]/blog/[slug]` and parses the `[slug]` param.
- Sets up `generateMetadata({ params })` using the parameter.
- Creates `generateStaticParams()` placeholder.
- Generates `BlogSlugView.tsx` receiving `{ slug: string }` as props.

**Important for Dynamic Routes:**
You must update `generateStaticParams()` in the generated `page.tsx` to fetch available parameter lists (e.g. all slugs) for Next.js to pre-render the pages statically (SSG).

## 3. Manual SEO Checklist

If creating pages manually, follow these steps:

1. **Create View:** `src/views/[name]/[Name]View.tsx`. Wrap UI in `<ViewWrapper>`.
2. **Create Route:** `src/app/[lang]/[name]/page.tsx`. Import the View.
3. **Metadata:** Export `generateMetadata` with correct `title`, `description`, and `canonicalPath`.
4. **Structured Data:** Include `<StructuredData>` (e.g. `BreadcrumbSchema`).
5. **Sitemap:** Add the path to `staticPaths` in `src/app/sitemap.ts` (for static routes).
