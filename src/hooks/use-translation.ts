import { useTranslationContext } from "@/components/providers/translation-provider";
import { usePathname, useRouter } from "next/navigation";
import { type Language } from "@/lib/constants/i18n";

export const useTranslation = () => {
  const t = useTranslationContext((state) => state.t);
  const lang = useTranslationContext((state) => state.lang);
  
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (newLang: Language) => {
    if (!pathname) return;
    
    const segments = pathname.split("/");
    // pathname starts with /, so segments[0] is empty, segments[1] is the language
    segments[1] = newLang;
    const newPath = segments.join("/");
    
    router.push(newPath);
  };

  return { t, lang, setLang };
};
