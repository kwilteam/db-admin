import { NextResponse } from "next/server"
import { getAccount, validateRefreshToken } from "@/utils/admin-db/db"
import {
  IRefreshJwt,
  createJwt,
  getCookie,
  setCookie,
  verifyJwt,
} from "@/utils/admin-db/auth"

// When JWT is expired, client requests new JWT with refresh token
export const POST = async () => {
  const refreshToken = getCookie("refreshToken")

  if (!refreshToken) {
    console.log("MISSING No refresh token found.")
    return NextResponse.json(
      { message: "Token not found." },
      {
        status: 401,
      },
    )
  }

  // Ensure the refresh token is valid and linked to the account
  let validRefreshToken: IRefreshJwt
  try {
    // First verify the refresh token is valid
    validRefreshToken = verifyJwt<IRefreshJwt>(refreshToken)

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
      { message: "Invalid refresh token." },
      {
        status: 401,
      },
    )
  }

  const account = getAccount(validRefreshToken.id)

  if (account === undefined) {
    return NextResponse.json(
      { message: "Invalid refresh token." },
      {
        status: 401,
      },
    )
  }

  const newToken = createJwt(
    {
      id: account.id,
      address: account.address,
      type: account.type_name,
    },
    "5m",
  )
  setCookie("token", newToken)

  // Send new JWT to client
  return NextResponse.json(
    { token: newToken },
    {
      status: 200,
    },
  )
}
