import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The matcher ensures this middleware only runs on routes starting with /admin.
  // We can directly proceed with the session check.
  const sessionToken = request.cookies.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the session token.
    const baseUrl = request.nextUrl.origin;
    const verifyResponse = await fetch(`${baseUrl}/api/auth/verify`, {
      headers: {
        cookie: `session_token=${sessionToken}`,
      },
    });

    if (!verifyResponse.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token is valid, allow the request to proceed.
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

