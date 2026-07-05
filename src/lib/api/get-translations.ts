import { unstable_cache } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type TranslationsRecord = Record<string, { en: string; vi: string }>;

export const getTranslations = unstable_cache(
  async () => {
    const supabase = createServerSupabaseClient();
    
    // Fetch all translations from the database
    const { data, error } = await supabase
      .from("translations")
      .select("key, en, vi");

    if (error) {
      console.error("[getTranslations] Error fetching translations:", error);
      return {};
    }

    // Convert array to a dictionary for O(1) lookup
    const translationsMap: TranslationsRecord = {};
    data.forEach((row) => {
      translationsMap[row.key] = {
        en: row.en,
        vi: row.vi,
      };
    });

    return translationsMap;
  },
  ["global-translations"], // Cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ["translations"], // Can be invalidated via on-demand revalidation
  }
);
