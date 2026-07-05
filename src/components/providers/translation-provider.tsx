"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type TranslationStore,
  createTranslationStore,
  type TranslationState,
} from "@/store/translation-store";

export const TranslationStoreContext = createContext<
  ReturnType<typeof createTranslationStore> | undefined
>(undefined);

export interface TranslationStoreProviderProps {
  children: ReactNode;
  initialData: TranslationState;
}

export const TranslationStoreProvider = ({
  children,
  initialData,
}: TranslationStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createTranslationStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createTranslationStore(initialData);
  }

  return (
    <TranslationStoreContext.Provider value={storeRef.current}>
      {children}
    </TranslationStoreContext.Provider>
  );
};

export const useTranslationContext = <T,>(
  selector: (store: TranslationStore) => T,
): T => {
  const translationStoreContext = useContext(TranslationStoreContext);

  if (!translationStoreContext) {
    throw new Error(
      `useTranslationContext must be used within TranslationStoreProvider`
    );
  }

  return useStore(translationStoreContext, selector);
};
