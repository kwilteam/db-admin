import { NextResponse } from "next/server"
import { addDays, format } from "date-fns"
import {
  getAccountByAddress,
  saveRefreshToken,
  validateAccessCode,
} from "@/utils/admin-db/db"
import {
  IAccountJwt,
  IRefreshJwt,
  createJwt,
  setCookie,
} from "@/utils/admin-db/auth"
import { validateEmailAddress } from "@/utils/validate"

interface IRequestBody {
  emailAddress: string
  accessCode: number
}

export const POST = async (request: Request) => {
  const { emailAddress, accessCode } = (await request.json()) as IRequestBody

  const validEmail = validateEmailAddress(emailAddress)

  if (!validEmail) {
    return NextResponse.json(
      { message: "Invalid email address." },
      {
        status: 400,
      },
    )
  }

  const account = getAccountByAddress("email", emailAddress)

  if (!account) {
    return NextResponse.json(
      { message: "Account does not exist." },
      {
        status: 404,
      },
    )
  }

  const accessCodeValid = validateAccessCode(account.id, accessCode)

  if (!accessCodeValid) {
    return NextResponse.json(
      { message: "Error validating access code." },
      {
        status: 401,
      },
    )
  }

  const newToken = createJwt<IAccountJwt>(
    {
      id: account.id,
      address: account.address,
      type: "email",
    },
    "5m",
  )
  setCookie("token", newToken)

  const refreshTokenJwt = createJwt<IRefreshJwt>(
    {
      id: account.id,
    },
    "1hr",
  )

  const expiresInMonth = format(addDays(new Date(), 30), "yyyy-MM-dd HH:mm:ss")
  saveRefreshToken(account.id, refreshTokenJwt, expiresInMonth) // Save refresh token to DB
  setCookie("refreshToken", refreshTokenJwt)

  return NextResponse.json(
    { message: "Access valid." },
    {
      status: 200,
    },
  )
}
