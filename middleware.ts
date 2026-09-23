import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/** English has no prefix: "/" is served from the `en` segment behind the
 *  scenes, and anyone who types "/en" is sent to the bare path, so each page has
 *  exactly one English address. "/uk" passes straight through. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/uk" || pathname.startsWith("/uk/")) {
    return NextResponse.next();
  }

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: framework files, API routes and anything with an extension
  // (videos, images, resume.pdf) are served as they are.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
