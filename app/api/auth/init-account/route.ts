import {
  adminAccountExists,
  getAccount,
  initAdminUser,
  saveRefreshToken,
} from "@/utils/admin/db"
import { EnumAccountType } from "@/utils/admin/schema"
import { setCookie } from "@/utils/admin/session"
import { createDb, isDbSetup } from "@/utils/admin/setup"
import { IAccountJwt, IRefreshJwt, createJwt } from "@/utils/admin/token"
import { addDays, format } from "date-fns"
import { NextRequest, NextResponse } from "next/server"

interface IRequestBody {
  name: string
  typeId: EnumAccountType
  address: string
}

export const POST = async (request: NextRequest) => {
  const accountExists = adminAccountExists()
  const { name, typeId, address } = (await request.json()) as IRequestBody

  // Initialize the database
  if (!isDbSetup()) {
    createDb()
  }

  if (accountExists) {
    return NextResponse.json(
      { data: "Account already created.", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  try {
    // Create the account
    const accountId = initAdminUser(name, typeId, address)

    const account = getAccount(accountId as number)

    if (!account) {
      return NextResponse.json(
        { data: "Could not create account.", outcome: "error" },
        {
          status: 401,
        },
      )
    }

    // Automatically sign in the user as they are the original admin account
    const newToken = await createJwt<IAccountJwt>(
      {
        id: account.id,
        address: account.address,
        type: EnumAccountType.Email,
        name: account.name,
      },
      "15m",
    )
    setCookie("token", newToken)

    const refreshTokenJwt = await createJwt<IRefreshJwt>(
      {
        id: account.id,
      },
      "30 days",
    )

    const expiresInMonth = format(
      addDays(new Date(), 30),
      "yyyy-MM-dd HH:mm:ss",
    )
    saveRefreshToken(account.id, refreshTokenJwt, expiresInMonth) // Save refresh token to DB
    setCookie("refreshToken", refreshTokenJwt)

    return NextResponse.json(
      { data: account, outcome: "success" },
      {
        status: 200,
      },
    )
  } catch (err) {
    return NextResponse.json(
      { data: "Could not create account.", outcome: "error" },
      {
        status: 401,
      },
    )
  }
}
