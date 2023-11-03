import { NextResponse } from "next/server"
import { addDays, format } from "date-fns"
import {
  getAccountByAddress,
  saveRefreshToken,
  validateAccessCode,
} from "@/utils/admin/db"
import { setCookie } from "@/utils/admin/session"
import { validateEmailAddress } from "@/utils/validate"
import { IApiResponse } from "@/utils/api"
import { IAccountJwt, IRefreshJwt, createJwt } from "@/utils/admin/token"
import { EnumAccountType } from "@/utils/admin/schema"

interface IRequestBody {
  emailAddress: string
  accessCode: number
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<string>>> => {
  const { emailAddress, accessCode } = (await request.json()) as IRequestBody

  const validEmail = validateEmailAddress(emailAddress)

  if (!validEmail) {
    return NextResponse.json(
      { data: "Invalid email address.", outcome: "error" },
      {
        status: 400,
      },
    )
  }

  const account = getAccountByAddress("email", emailAddress)

  if (!account) {
    return NextResponse.json(
      { data: "Account could not be found.", outcome: "error" },
      {
        status: 404,
      },
    )
  }

  console.log("Validating access code", account.id, accessCode)

  const accessCodeValid = validateAccessCode(account.id, accessCode)

  if (!accessCodeValid) {
    return NextResponse.json(
      { data: "Error validating access code.", outcome: "error" },
      {
        status: 401,
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
