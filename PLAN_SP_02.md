# PLAN_SP_02: Performance & Advanced SEO

This plan outlines Phase 2 improvements to make this boilerplate achieve 100/100 Lighthouse scores and maximum search engine visibility.

## 1. Advanced SEO & Indexing (Maximum Visibility)

- [ ] **Dynamic OG Image Generation (`next/og`)**: 
  - *Idea*: Replace static placeholder images with edge-generated OG images (`opengraph-image.tsx`). This dynamically generates share images with text overlay (e.g., Blog titles) when shared on Facebook/Twitter, massively boosting click-through rates.
- [ ] **Third-party Scripts Optimization (`next/script`)**:
  - *Idea*: Prepare boilerplate for Google Analytics / Tag Manager using `next/script` with `strategy="worker"` (Partytown) or `afterInteractive` so tracking scripts do not block the main thread and hurt Core Web Vitals.
- [ ] **Robots.txt Environment Awareness**:
  - *Idea*: Update `robots.ts` to dynamically return `Disallow: /` if `process.env.VERCEL_ENV !== 'production'`. This prevents staging/preview URLs from accidentally being indexed by Google.

## 2. Core Web Vitals & Performance (Speed)

- [ ] **Next/Font Optimization**:
  - *Idea*: Integrate `@next/font/google` in `layout.tsx`. This downloads fonts at build time and self-hosts them, eliminating Cumulative Layout Shift (CLS) and reducing network requests.
- [ ] **Dynamic Imports for Heavy Plugins (`next/dynamic`)**:
  - *Idea*: Setup a pattern in `src/plugins` for heavy components (e.g., ThreeJS animations, Video players, Maps). Using `dynamic(() => import(...))` ensures these JS bundles are only loaded when scrolled into view.
- [ ] **Bundle Analyzer Setup**:
  - *Idea*: Install `@next/bundle-analyzer` and configure `next.config.ts`. This allows developers to visually inspect JS bundle sizes and find out if a dependency (like lodash) is bloating the app.

## 3. Plugin Architecture (Extensibility)

- [ ] **Implement the CTA Form Plugin (Supabase)**:
  - *Idea*: Build out the first functional plugin (`plugins/cta-form`) that connects to the Supabase `leads` table we migrated earlier.
  - *Scope*: Real-time form validation, API route handling (Server Actions), and database insertion.
- [ ] **Schema JSON-LD Plugins**:
  - *Idea*: Create reusable schema generators for `Article` (for blogs) and `LocalBusiness` (for local SEO).
