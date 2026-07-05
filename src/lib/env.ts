import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// 📌 CENTRALIZED ENVIRONMENT VARIABLES
// ─────────────────────────────────────────────────────────────
// Single source of truth for ALL env vars in the project.
// Import { env } from "@/lib/env" — only use in SERVER-SIDE code:
//   ✅ Server Components, Server Actions, API Routes, sitemap.ts, robots.ts
//   ❌ Client Components ("use client") — env vars are NOT exposed to browser
//
// This is intentional for security — no secrets leak to the client.
// ─────────────────────────────────────────────────────────────

const envSchema = z.object({
  // ─── App ────────────────────────────────────────────────
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  /** Base URL of the site — used for canonical URLs, OG tags, sitemap */
  SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),

  // ─── Google Tag Manager ─────────────────────────────────
  /** GTM Container ID (e.g., GTM-XXXXXXX). Leave empty to disable. */
  GTM_ID: z
    .string()
    .default(""),

  // ─── Supabase ───────────────────────────────────────────
  /** Supabase project URL */
  SUPABASE_URL: z
    .string()
    .default(""),

  /** Supabase anon (public) key — for general queries */
  SUPABASE_ANON_KEY: z
    .string()
    .default(""),

  /** Supabase service role key — has full database access, use carefully */
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .default(""),

  // ─── External API (Optional) ───────────────────────────
  /** Base URL for external REST/GraphQL API */
  API_URL: z
    .string()
    .default(""),
});

// ─── Parse & Validate ───────────────────────────────────────

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.SITE_URL,
  GTM_ID: process.env.GTM_ID,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  API_URL: process.env.API_URL,
});

// ─── Helper ─────────────────────────────────────────────────

/**
 * Generate an absolute URL from a relative path.
 * Used for SEO: canonical URLs, OG tags, sitemap entries.
 */
export function absoluteUrl(path: string): string {
  return `${env.SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ─── Type Export ────────────────────────────────────────────
export type Env = z.infer<typeof envSchema>;
