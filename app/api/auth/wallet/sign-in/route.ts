import { NextResponse } from "next/server"
import { addDays, format } from "date-fns"
import {
  getAccessCode,
  getAccountByAddress,
  saveRefreshToken,
  validateAccessCode,
} from "@/utils/admin/db"
import { setCookie } from "@/utils/admin/session"
import { validateEmailAddress } from "@/utils/validate"
import { IApiResponse } from "@/utils/api"
import { IAccountJwt, IRefreshJwt, createJwt } from "@/utils/admin/token"
import { EnumAccountType } from "@/utils/admin/schema"
import { verifyMessage } from "ethers"
import { buildMessage } from "@/utils/wallet"

interface IRequestBody {
  address: string
  signature: string
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<string>>> => {
  const { address, signature } = (await request.json()) as IRequestBody

  const account = getAccountByAddress("wallet", address)

  if (!account) {
    return NextResponse.json(
      { data: "Account could not be found.", outcome: "error" },
      {
        status: 404,
      },
    )
  }

  // Get message from db
  const generatedAccessCode = getAccessCode(account.id)

  if (!generatedAccessCode) {
    return NextResponse.json(
      { data: "Access code could not be found.", outcome: "error" },
      {
        status: 404,
      },
    )
  }

  const message = buildMessage(
    generatedAccessCode.code.toString(),
    generatedAccessCode.expires_at,
  )

  const recoveredAddress = verifyMessage(message, signature)

  console.log("Recovered address", recoveredAddress)
  console.log("Address", address)

  if (!recoveredAddress) {
    return NextResponse.json(
      { data: "Could not recover address.", outcome: "error" },
      {
        status: 400,
      },
    )
  }

  if (address !== recoveredAddress) {
    return NextResponse.json(
      { data: "Address could not be validated.", outcome: "error" },
      {
        status: 400,
      },
    )
  }

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

  const expiresInMonth = format(addDays(new Date(), 30), "yyyy-MM-dd HH:mm:ss")
  saveRefreshToken(account.id, refreshTokenJwt, expiresInMonth) // Save refresh token to DB
  setCookie("refreshToken", refreshTokenJwt)

  return NextResponse.json(
    { data: "Access valid.", outcome: "success" },
    {
      status: 200,
    },
  )
}
