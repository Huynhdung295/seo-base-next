import { GoogleTagManager as NextGTM } from "@next/third-parties/google";

import { env } from "@/lib/env";

// ─── Component ──────────────────────────────────────────────

/**
 * Google Tag Manager component using the official @next/third-parties package.
 * Reads GTM container ID from centralized env config (server-only).
 *
 * This is a Server Component — renders GTM script on the server,
 * no need to expose GTM_ID to the client browser.
 */
export function GoogleTagManager() {
  const gtmId = env.GTM_ID;

  if (!gtmId) return null;

  return <NextGTM gtmId={gtmId} />;
}
