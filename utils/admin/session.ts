import { cookies } from "next/headers"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { IRefreshJwt, verifyJwt } from "./token"
import { validateRefreshToken } from "./db"

export const setCookie = (name: string, value: string, options = {}) => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  })
}

export const getCookie = (name: string): RequestCookie | undefined => {
  return cookies().get(name)
}

export const isSignedIn = async (): Promise<boolean> => {
  let signedIn = false
  let validToken = undefined
  let validRefreshToken = undefined
  const token = getCookie("token")
  const refreshToken = getCookie("refreshToken")

  if (token) {
    validToken = await verifyJwt(token)
  }

  if (refreshToken) {
    const verifyRefreshToken = await verifyJwt<IRefreshJwt>(refreshToken)

    if (verifyRefreshToken) {
      validRefreshToken = validateRefreshToken(
        verifyRefreshToken.id,
        refreshToken.value,
      )
    }
  }

  // If either token is valid, user is signed in
  if (validToken || validRefreshToken) {
    signedIn = true
  }

  return signedIn
}
