import { createStore } from "zustand";
import { type Language, DEFAULT_LANG } from "@/lib/constants/i18n";
import type { TranslationKey } from "@/types/i18n";

export interface TranslationState {
  translations: Record<string, any>;
  lang: Language;
}

export interface TranslationActions {
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export type TranslationStore = TranslationState & TranslationActions;

export const defaultInitState: TranslationState = {
  translations: {},
  lang: DEFAULT_LANG,
};

export const createTranslationStore = (
  initState: TranslationState = defaultInitState
) => {
  return createStore<TranslationStore>()((set, get) => ({
    ...initState,
    setLang: (lang) => set({ lang }),
    t: (key: TranslationKey) => {
      const state = get();
      const translation = state.translations[key];
      if (!translation) return key; // Fallback to key if not found
      return translation[state.lang] || key;
    },
  }));
};
