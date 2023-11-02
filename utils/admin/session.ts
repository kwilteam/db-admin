import { cookies } from "next/headers"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { verifyJwt } from "./token"

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
  let validToken = false
  let validRefreshToken = false
  const token = getCookie("token")
  const refreshToken = getCookie("refreshToken")

  if (token) {
    validToken = await verifyJwt(token)
  }

  if (refreshToken) {
    validRefreshToken = await verifyJwt(refreshToken)
  }

  // If either token is valid, user is signed in
  if (validToken || validRefreshToken) {
    signedIn = true
  }

  return signedIn
}
