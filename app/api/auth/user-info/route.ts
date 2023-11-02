import { getCookie } from "@/utils/admin-db/cookies"
import { verifyJwt } from "@/utils/admin-db/token"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const token = getCookie("token")

  if (!token) {
    return NextResponse.json(
      { data: "Token not found", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  try {
    const account = await verifyJwt(token)

    return NextResponse.json(
      { data: account, outcome: "error" },
      {
        status: 200,
      },
    )
  } catch (err) {
    console.log("JWT Token invalid", err)
  }
}
