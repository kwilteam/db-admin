import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// https://nextjs.org/docs/app/building-your-application/routing/middleware

// Middleware will need to cover following cases:
// 1. If not setup, redirect to setup page
// 2. If not setup but an account exists in admin DB, redirect to login page
// 3. If not setup, and logged in, only allow /setup to be accessed
// 4. If setup and NOT logged in, redirect to login page
// 5. If setup and logged in, continue to requested page (but only if not /setup)

// This function can be marked `async` if using `await` inside
// request.url gets the route URL e.g. http://localhost:3000/
export function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname)

  const pathname = request.nextUrl.pathname

  // If logged in and setup, continue to requested page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/databases", request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|[a-z].js).*)",
}
