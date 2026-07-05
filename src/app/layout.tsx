import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { constructMetadata } from "@/lib/metadata";

import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning data-scroll-behavior="smooth">
      {/* Google Tag Manager — non-blocking, loads async */}
      <GoogleTagManager />

      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}

        {/* Vercel Analytics — lightweight, auto-configured on Vercel */}
        <Analytics />

        {/* Vercel Speed Insights — monitors Core Web Vitals */}
        <SpeedInsights />
      </body>
    </html>
  );
}
