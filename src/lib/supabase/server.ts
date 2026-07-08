import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";

// ─── Server Client ──────────────────────────────────────────

/**
 * Create a Supabase client for Server Components / Server Actions / Route Handlers.
 * Creates a new instance per request to avoid shared state.
 *
 * ⚠️ Uses ANON KEY by default — respects Row Level Security (RLS).
 * For admin operations that need to bypass RLS, use createAdminSupabaseClient().
 *
 * All env values come from centralized @/lib/env (server-only).
 *
 * @example
 * // In a Server Component:
 * import { createServerSupabaseClient } from "@/lib/supabase/server";
 *
 * export default async function Page() {
 *   const supabase = createServerSupabaseClient();
 *   const { data } = await supabase.from("posts").select("*");
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 *
 * @example
 * // In a Server Action:
 * "use server";
 * import { createServerSupabaseClient } from "@/lib/supabase/server";
 *
 * export async function myAction(formData: FormData) {
 *   const supabase = createServerSupabaseClient();
 *   await supabase.from("leads").insert({ ... });
 * }
 */
export function createServerSupabaseClient() {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "[Supabase] Missing environment variables. " +
        "Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local (see .env.example)"
    );
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ─── Admin Client (bypasses RLS) ────────────────────────────

/**
 * Create a Supabase client with SERVICE_ROLE_KEY that bypasses RLS.
 * ⚠️ Use ONLY for admin operations, internal scripts, or webhook handlers.
 * NEVER use this in code paths that accept user input without validation.
 *
 * @example
 * import { createAdminSupabaseClient } from "@/lib/supabase/server";
 *
 * // Admin-only operation
 * const supabase = createAdminSupabaseClient();
 * await supabase.from("users").delete().eq("id", userId);
 */
export function createAdminSupabaseClient() {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "[Supabase Admin] Missing environment variables. " +
        "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (see .env.example)"
    );
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
