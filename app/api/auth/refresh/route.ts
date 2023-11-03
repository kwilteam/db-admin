import { NextResponse } from "next/server"
import { getAccount, validateRefreshToken } from "@/utils/admin/db"
import { getCookie, setCookie } from "@/utils/admin/session"
import {
  IAccountJwt,
  IRefreshJwt,
  createJwt,
  verifyJwt,
} from "@/utils/admin/token"

// When JWT is expired, client requests new JWT with refresh token
export const POST = async () => {
  const refreshToken = getCookie("refreshToken")

  if (!refreshToken) {
    return NextResponse.json(
      { data: "Token not found.", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  // Ensure the refresh token is valid and linked to the account
  let validRefreshToken: IRefreshJwt | undefined
  try {
    // First verify the refresh token is valid
    validRefreshToken = await verifyJwt<IRefreshJwt>(refreshToken)

    if (!validRefreshToken) {
      throw new Error("Invalid refresh token.")
    }

    console.log("validRefreshToken", validRefreshToken)

    // Then check the refresh token is linked to the account in the DB
    const validInDb = validateRefreshToken(
      validRefreshToken.id,
      refreshToken.value,
    )

    if (!validInDb) {
      throw new Error("Invalid refresh token.")
    }

    console.log("validInDb", validInDb)
  } catch (err) {
    return NextResponse.json(
      { data: "Invalid refresh token.", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  const account = getAccount(validRefreshToken.id)

  if (account === undefined) {
    return NextResponse.json(
      { data: "Invalid refresh token.", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  const newToken = await createJwt<IAccountJwt>(
    {
      id: account.id,
      address: account.address,
      type: account.type_id,
      name: account.name,
    },
    "15m",
  )
  setCookie("token", newToken)

  // Send new JWT to client
  return NextResponse.json(
    { data: newToken, outcome: "success" },
    {
      status: 200,
    },
  )
}
