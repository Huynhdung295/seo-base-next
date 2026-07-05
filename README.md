# Next.js Landing Page Architecture Documentation

This repository contains a high-performance, enterprise-grade Next.js boilerplate tailored for landing pages and SEO-critical web applications. The architecture prioritizes performance, type safety, modularity, and comprehensive internationalization (i18n).

## Technical Stack Overview

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) + React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 + PostCSS (via Webpack configuration) |
| **UI Components** | Shadcn UI (Headless) + Radix UI |
| **State Management** | Zustand (Client Store) + React Context |
| **Database & Auth** | Supabase (Server Actions & Edge integrations) |
| **Analytics** | Vercel Analytics + Speed Insights + GTM |
| **SEO** | Dynamic Metadata + JSON-LD (schema-dts) + Auto Sitemap/Robots |
| **Quality Assurance** | ESLint + Prettier + Husky + lint-staged |

## Architectural Highlights

### 1. Internationalization (i18n) via URL-based Routing

The application implements a robust URL-based internationalization strategy (`/[lang]/...`) rather than relying on internal state or cookies, ensuring optimal SEO indexing for multiple languages.

- **Middleware Edge Routing**: Incoming requests without a locale prefix are intercepted at the Edge (`src/middleware.ts`) and redirected to the default language (e.g., `/` -> `/en/`).
- **Constant Configuration**: Language support is centrally managed in `src/lib/constants/i18n.ts`.
- **Hybrid State Hydration**: Translations are fetched once on the server (cached via `unstable_cache`), passed down to a Context Provider in the Root Layout, and hydrated into a client-side Zustand store (`src/store/translation-store.ts`). This avoids SSR memory leaks while providing seamless client-side access via the `useTranslation` hook.
- **Type-safe Translation Keys**: We utilize a custom script (`npm run sync:i18n`) that fetches translation keys directly from the Supabase database and generates a TypeScript declaration file (`src/types/i18n.d.ts`). This ensures compile-time validation for all `t('key')` function calls.

### 2. Styling Engine (Tailwind CSS v4)

Due to current compatability constraints between Turbopack and Tailwind CSS v4 PostCSS processing in Next.js 16, the development server is explicitly configured to use Webpack (`next dev --webpack`).

All UI components are strictly styled using the utility-first approach. Global styles are kept minimal inside `src/app/globals.css`.

### 3. Centralized Environment Configuration

Environment variables are validated at runtime and build time using Zod (`src/lib/env.ts`). This acts as the single source of truth. Direct usage of `process.env` is restricted across the codebase to prevent silent failures related to missing configuration.

### 4. Data Fetching and Caching Strategy

The data fetching layer (`src/lib/fetcher.ts` and API utilities like `getTranslations`) leverages Next.js App Router caching mechanisms:

- **SSG (Static Generation)**: `revalidate: false` for configurations and immutable data.
- **ISR (Incremental Static Regeneration)**: `revalidate: 3600` for infrequently changing data (e.g., translations). Invalidation is handled via `revalidateTag`.
- **SSR (Server-Side Rendering)**: `revalidate: 0` for real-time data constraints.

## Project Structure

```text
src/
├── app/
│   ├── [lang]/             # Dynamic route segment for i18n
│   │   ├── layout.tsx      # Root Layout (Server-side translation fetch)
│   │   ├── page.tsx        # Entry point
│   │   └── not-found.tsx   # Custom 404 error boundary
│   ├── sitemap.ts          # Auto-generated /sitemap.xml
│   ├── robots.ts           # Auto-generated /robots.txt
│   └── globals.css         # Global stylesheet
├── components/
│   ├── ui/                 # Shadcn UI primitives
│   ├── sections/           # High-level page sections
│   ├── common/             # Reusable UI elements (WelcomeText, etc.)
│   └── providers/          # React Context Providers (TranslationProvider)
├── hooks/
│   ├── use-translation.ts  # Zustand store accessor and URL modifier
│   └── useScrollAnimation.ts
├── lib/
│   ├── constants/          # Application-wide constants (i18n config)
│   ├── env.ts              # Zod environment validation
│   ├── utils.ts            # Utility functions (cn, etc.)
│   ├── metadata.ts         # SEO metadata constructor
│   ├── api/                # Data fetching implementations
│   └── supabase/           # Supabase client instantiation
├── store/
│   └── translation-store.ts# Zustand configuration for i18n
├── types/
│   └── i18n.d.ts           # Auto-generated translation keys
├── actions/
│   └── lead.ts             # Server Actions (Mutations)
└── middleware.ts           # Edge routing and locale detection
```

## Development Workflow

### Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Copy `.env.example` to `.env.local` and populate the required variables:
   ```env
   SITE_URL=https://your-domain.com
   GTM_ID=GTM-XXXXXXX
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Database Migration**:
   Execute the SQL migrations found in `supabase/migrations/` via the Supabase Dashboard SQL Editor to instantiate the required schema (e.g., the `translations` table).

4. **Synchronize i18n Types**:
   After creating the translation table, generate the TypeScript definitions:
   ```bash
   npm run sync:i18n
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Script Execution Reference

- `npm run dev`: Starts the Next.js development server using Webpack.
- `npm run build`: Compiles the application for production deployment.
- `npm run lint`: Executes ESLint validation.
- `npm run sync:i18n`: Connects to Supabase to extract translation keys and overwrites `src/types/i18n.d.ts`.

## Deployment Guidelines

The architecture is heavily optimized for Vercel. Ensure all environment variables specified in `src/lib/env.ts` are provisioned in your deployment pipeline. No custom build steps are required beyond the standard `next build` command.
