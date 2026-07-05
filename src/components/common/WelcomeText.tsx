"use client";

import { useTranslation } from "@/hooks/use-translation";

export function WelcomeText() {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-balance text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
        {t("welcome_msg")}
      </h1>
      <p className="max-w-2xl text-balance text-center text-lg text-muted-foreground">
        {t("desc_msg")}
      </p>
      
      <div className="flex items-center gap-2 mt-4 p-2 bg-muted rounded-md">
        <span className="text-sm text-muted-foreground">Language:</span>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("vi")}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            lang === "vi" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          VI
        </button>
      </div>
    </div>
  );
}
