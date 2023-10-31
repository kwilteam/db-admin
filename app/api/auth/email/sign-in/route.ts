import { NextResponse } from "next/server"
import { addDays, format } from "date-fns"
import {
  getAccountByAddress,
  saveRefreshToken,
  validateAccessCode,
} from "@/utils/admin-db/db"
import { createJwt, getRefreshToken, setCookie } from "@/utils/admin-db/auth"
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

  const newToken = createJwt({
    id: account.id,
    address: account.address,
    type: "email",
  })
  setCookie("token", newToken)

  const refreshToken = getRefreshToken()

  const expiresInMonth = format(addDays(new Date(), 30), "yyyy-MM-dd HH:mm:ss")
  saveRefreshToken(account.id, refreshToken, expiresInMonth) // Save refresh token to DB
  setCookie("refreshToken", refreshToken)

  return NextResponse.json(
    { message: "Access valid." },
    {
      status: 200,
    },
  )
}
