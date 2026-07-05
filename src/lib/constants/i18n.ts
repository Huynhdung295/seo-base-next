export const SUPPORTED_LANGS = ["en", "vi"] as const;

export type Language = typeof SUPPORTED_LANGS[number];

export const DEFAULT_LANG: Language = "en";
