import { NextResponse } from "next/server"

export const GET = (req: Request) => {
  // TODO: clear the session
  return NextResponse.redirect(new URL("/signin", req.url))
}
