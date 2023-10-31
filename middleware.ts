import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import { adminAccountExists } from "./utils/admin-db/db"

// https://nextjs.org/docs/app/building-your-application/routing/middleware

// Middleware will need to cover following cases:
// If setup and NOT logged in, redirect to login page
// If setup and logged in, continue to requested page
// If not setup, and no token then redirect to setup page

// This function can be marked `async` if using `await` inside
// request.url gets the route URL e.g. http://localhost:3000/
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("token")
  // TODO: Will need to check if admin account created
  // If admin account created then we require sign-in
  // const adminAccountCreated = true

  if (!token && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  } else if (pathname === "/") {
    return NextResponse.redirect(new URL("/databases", request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!setup|sign-in|_next/static|_next/image|images).*)",
}
