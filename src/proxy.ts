import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LANGS, DEFAULT_LANG } from "@/lib/constants/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = SUPPORTED_LANGS.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // E.g. incoming request is /about
  // The new URL is now /en/about
  request.nextUrl.pathname = `/${DEFAULT_LANG}${pathname}`;
  
  // E.g. incoming request is /
  // The new URL is now /en/ (actually Next.js handles trailing slash if configured, but /en works)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all files in public folder (e.g. /favicon.ico)
    '/((?!_next|api|favicon.ico|.*\\.).*)',
  ],
};
