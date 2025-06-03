import { NextRequest, NextResponse } from "next/server";

// List of supported locales
const locales = ["en", "hr"];
const defaultLocale = "en";

// Get locale from cookie or accept-language header
function getLocaleFromRequest(request: NextRequest): string {
  // Check if there's a locale cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // Get preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    // Parse the Accept-Language header
    const parsedLanguages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [language, priority = "1"] = lang.trim().split(";q=");
        return {
          language: language.split("-")[0],
          priority: parseFloat(priority),
        };
      })
      .sort((a, b) => b.priority - a.priority);

    // Find the first supported locale
    const preferredLocale = parsedLanguages.find((lang) =>
      locales.includes(lang.language)
    )?.language;

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a valid locale
  const pathnameHasValidLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasValidLocale) return;

  // Get the preferred locale
  const locale = getLocaleFromRequest(request);

  // Create a new URL with the locale prefix
  const newUrl = new URL(
    `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
    request.url
  );

  // Copy over search params and hash
  newUrl.search = request.nextUrl.search;
  newUrl.hash = request.nextUrl.hash;

  // Redirect to the new URL
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Only run the middleware on pages, not on assets or api routes
  matcher: [
    // Skip all internal paths (_next, api)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
