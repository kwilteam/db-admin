import { NextRequest, NextResponse } from "next/server"

export const GET = (req: NextRequest) => {
  const response = NextResponse.redirect(new URL("/sign-in", req.url))

  response.cookies.delete("token")
  response.cookies.delete("refreshToken")

  return response
}
