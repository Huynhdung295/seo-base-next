import { env } from "@/lib/env";

// ─── Types ──────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  /**
   * Revalidation time in seconds.
   * - `3600` (default) → ISR: re-fetch every 1 hour, serve cached in between
   * - `0` → Always fresh (SSR)
   * - `false` → Static forever until next deploy (SSG)
   */
  revalidate?: number | false;
  /** Tags for on-demand revalidation via revalidateTag() */
  tags?: string[];
}

// ─── Cached Fetch Utility ───────────────────────────────────

/**
 * Fetch data with Next.js built-in caching.
 *
 * How caching works in Next.js App Router:
 * ┌─────────────────────────────────────────────────────────┐
 * │ revalidate: 3600  → ISR  (cached, re-fetches hourly)   │
 * │ revalidate: 0     → SSR  (always fresh, no cache)      │
 * │ revalidate: false → SSG  (cached forever until deploy)  │
 * │ cache: "no-store" → SSR  (never cached)                 │
 * └─────────────────────────────────────────────────────────┘
 *
 * @example
 * // ISR: cached for 1 hour (default)
 * const posts = await fetchWithCache<Post[]>("/api/posts");
 *
 * @example
 * // SSG: cached forever (until next deploy)
 * const config = await fetchWithCache<Config>("/api/config", {
 *   revalidate: false,
 * });
 *
 * @example
 * // SSR: always fresh
 * const user = await fetchWithCache<User>("/api/me", {
 *   revalidate: 0,
 * });
 *
 * @example
 * // On-demand revalidation with tags
 * const post = await fetchWithCache<Post>(`/api/posts/${id}`, {
 *   tags: ["posts", `post-${id}`],
 * });
 * // Then trigger: revalidateTag("posts") from a Server Action
 */
export async function fetchWithCache<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 3600, tags, ...fetchOptions } = options;

  // Build the full URL if it's a relative path
  const fullUrl = url.startsWith("http") ? url : apiUrl(url);

  const response = await fetch(fullUrl, {
    ...fetchOptions,
    next: {
      ...(revalidate !== false && { revalidate }),
      ...(tags && { tags }),
    },
  });

  if (!response.ok) {
    throw new Error(
      `[fetchWithCache] Failed to fetch ${fullUrl}: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── REST API Helper ────────────────────────────────────────

/**
 * Construct a full API URL from a relative path.
 * Uses centralized env for the base URL.
 */
export function apiUrl(path: string): string {
  const baseUrl = env.API_URL || env.SITE_URL;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
