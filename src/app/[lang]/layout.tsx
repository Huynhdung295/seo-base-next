import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { constructMetadata } from "@/lib/metadata";
import { getTranslations } from "@/lib/api/get-translations";
import { DEFAULT_LANG, SUPPORTED_LANGS, type Language } from "@/lib/constants/i18n";
import { TranslationStoreProvider } from "@/components/providers/translation-provider";

import "../globals.css";

// ─── Font Configuration ─────────────────────────────────────
// Using next/font/google to prevent Layout Shift (CLS)
const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

// ─── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout ────────────────────────────────────────────

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  
  // Validate language, fallback to default if invalid
  const validLang = SUPPORTED_LANGS.includes(lang as Language) 
    ? (lang as Language) 
    : DEFAULT_LANG;

  const translations = await getTranslations();

  return (
    <html lang={validLang} suppressHydrationWarning data-scroll-behavior="smooth">
      {/* Google Tag Manager — non-blocking, loads async */}
      <GoogleTagManager />

      <body className={`${fontSans.variable} font-sans antialiased`}>
        <TranslationStoreProvider initialData={{ translations, lang: validLang }}>
          {children}
        </TranslationStoreProvider>

        {/* Vercel Analytics — lightweight, auto-configured on Vercel */}
        <Analytics />

        {/* Vercel Speed Insights — monitors Core Web Vitals */}
        <SpeedInsights />
      </body>
    </html>
  );
}
