import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jose from "jose"

// TODO: Load this from env vars and throw error if not set
const jwtSecret = process.env.JWT_SECRET ?? "JWT_SECRET Must be set."
const secret = new TextEncoder().encode(jwtSecret)

// https://nextjs.org/docs/app/building-your-application/routing/middleware

// Middleware will need to cover following cases:
// If setup and NOT logged in, redirect to login page
// If setup and logged in, continue to requested page
// If not setup, and no token then redirect to setup page

// This function can be marked `async` if using `await` inside
// request.url gets the route URL e.g. http://localhost:3000/
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("token")
  const refreshToken = request.cookies.get("refreshToken")

  let validToken = await validateToken(token)

  if (!validToken && refreshToken) {
    validToken = await refreshAndValidateToken(refreshToken, request)
  }

  if (!validToken && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  } else if (pathname === "/") {
    return NextResponse.redirect(new URL("/databases", request.url))
  }
  return NextResponse.next()
}

async function validateToken(token: any) {
  let validToken: boolean | undefined
  try {
    if (token) {
      const { payload } = await jose.jwtVerify(token.value, secret)
      if (payload) {
        // JWT is valid and not expired
        validToken = true
      }
    }
  } catch (err) {
    console.log("JWT Token invalid", err)
  }
  return validToken
}

async function refreshAndValidateToken(
  refreshToken: any,
  request: NextRequest,
) {
  let validToken: boolean | undefined
  try {
    const { payload: refreshPayload } = await jose.jwtVerify(
      refreshToken.value,
      secret,
    )

    if (refreshPayload) {
      // NOTE: We have to do this due to a limitation in Next.js, that restricts the middleware as an Edge Function
      // This means we can't use many of the Node.js APIs, including fs, which we need to access the DB directly
      const refreshResponse = await fetch(
        "http://localhost:3003/api/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken.value}`,
          },
          credentials: "include",
        },
      )

      if (refreshResponse.ok) {
        const body = await refreshResponse.json()

        const response = NextResponse.next()
        response.cookies.set("token", body.token)

        return true // TODO: May need to return response
      } else {
        console.log(refreshResponse.status, refreshResponse.statusText)
        throw new Error("Refresh token request failed")
      }
    }
  } catch (err) {
    console.log("Refresh JWT Token invalid", err)
  }
  return validToken
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api/auth|access-code|setup|sign-in|_next/static|_next/image|images).*)",
}
