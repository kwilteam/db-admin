import { NextResponse } from "next/server"
import { validateRefreshToken } from "@/utils/admin-db/db"
import {
  IAccountJwt,
  createJwt,
  getCookie,
  setCookie,
  verifyJwt,
} from "@/utils/admin-db/auth"

// When JWT is expired, client requests new JWT with refresh token
export const POST = async () => {
  const token = getCookie("token")
  const refreshToken = getCookie("refreshToken")

  if (!refreshToken || !token) {
    return NextResponse.json(
      { message: "Tokens not found." },
      {
        status: 401,
      },
    )
  }

  // parse the account info from the JWT
  let account: IAccountJwt
  try {
    account = verifyJwt(token)
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid token." },
      {
        status: 401,
      },
    )
  }

  // Ensure the refresh token is valid and linked to the account
  const validRefreshToken = validateRefreshToken(account.id, refreshToken.value)
  if (!validRefreshToken) {
    return NextResponse.json(
      { message: "Invalid refresh token." },
      {
        status: 401,
      },
    )
  }

  const newToken = createJwt(account)
  setCookie("token", newToken)

  // Send new JWT to client
  return NextResponse.json(
    { message: "Access valid." },
    {
      status: 200,
    },
  )
}
