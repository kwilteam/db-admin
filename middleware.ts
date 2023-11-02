import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jose from "jose"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { IApiResponse } from "./utils/api"
import { getJwtSecret } from "./utils/admin-db/token"

// https://nextjs.org/docs/app/building-your-application/routing/middleware

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("token")
  const refreshToken = request.cookies.get("refreshToken")
  const response = NextResponse.next()

  let validToken = await validateToken(token)

  // If the token is valid, then request can continue to route
  if (validToken) {
    return response
  }

  // If the token is invalid, but there is a refresh token, then try to refresh the token
  if (!validToken && refreshToken) {
    const newToken = await refreshAndValidateToken(refreshToken, request)

    // If the refresh token is valid, then request can continue to route
    if (newToken) {
      // Set the new token in the response
      response.cookies.set("token", newToken)

      return response
    }
  }

  // By this point we know the token is invalid and there is no refresh token, so redirect to sign-in
  if (pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
}

async function validateToken(token: any) {
  let validToken: boolean | undefined
  const secret = getJwtSecret()
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
  refreshToken: RequestCookie,
  request: NextRequest,
): Promise<string | undefined> {
  const secret = getJwtSecret()
  try {
    const { payload: refreshPayload } = await jose.jwtVerify(
      refreshToken.value,
      secret,
    )

    if (refreshPayload) {
      // NOTE: We have to do this due to a limitation in Next.js, that restricts the middleware to being an Edge Function with limited Node.js APIs
      // This means we can't use many including fs, which we need to access the SqliteDB directly, to verify the refresh token is valid
      // See https://github.com/vercel/next.js/discussions/46722 for more info
      const refreshResponse = await fetch(
        new Request(new URL("/api/auth/refresh", request.url), {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken.value}`,
          },
          credentials: "include",
        }),
      )

      if (refreshResponse.ok) {
        const body = (await refreshResponse.json()) as IApiResponse<string>

        return body.data
      } else {
        console.log(refreshResponse.status, refreshResponse.statusText)
        throw new Error("Refresh token request failed")
      }
    }
  } catch (err) {
    console.log("Refresh JWT Token invalid", err)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api/auth|access-code|setup|sign-in|_next/static|_next/image|images).*)",
}
