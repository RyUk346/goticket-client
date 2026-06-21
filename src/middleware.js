import { NextResponse } from "next/server";

const PROTECTED = [/^\/dashboard(\/.*)?$/, /^\/tickets\/[^/]+$/];

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  if (!PROTECTED.some((re) => re.test(pathname))) return NextResponse.next();

  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.includes("session_token") || c.name.includes("better-auth"));

  if (!hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname + (search || ""));
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tickets/:path*"],
};