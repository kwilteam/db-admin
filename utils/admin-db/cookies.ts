import { cookies } from "next/headers"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

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
