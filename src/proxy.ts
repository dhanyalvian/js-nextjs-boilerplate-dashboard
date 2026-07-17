//- src/proxy.ts

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const accessToken = req.cookies.get("access_token")

  // 🔐 Not logged in & trying to access protected page
  if (!accessToken && !PUBLIC_PATHS.includes(pathname)) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 🔁 Logged in & trying to access login page
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (req.nextUrl.pathname.startsWith("/api")) {
    const token = req.cookies.get("access_token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next static files
     * - _next image optimizer
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
