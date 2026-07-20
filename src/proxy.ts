import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard", "/trips", "/profile"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("wayfarly_session")?.value;
  const session = token ? verifySession(token) : null;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// NOTE: matcher is empty by default so /dashboard, /trips and /profile render
// with seed data out of the box for demo/portfolio purposes without needing
// MongoDB, auth, or Cloudinary configured. Once you've set MONGODB_URI and
// wired up real registration/login (see README), swap the matcher below back
// in to enforce authentication on these routes:
//
// matcher: ["/dashboard/:path*", "/trips/:path*", "/profile/:path*"],
export const config = {
  matcher: [],
};
