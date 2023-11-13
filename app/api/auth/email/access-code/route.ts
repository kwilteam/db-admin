import { NextResponse } from "next/server"
import { saveAccessCode, getAccountByAddress } from "@/utils/admin/db"
import { addMinutes, format } from "date-fns"
import { validateEmailAddress } from "@/utils/validate"
import { IApiResponse } from "@/utils/api"
import { sendAccessCode } from "@/utils/admin/mail"
import { EnumAccountType } from "@/utils/admin/schema"
import { generateAccessCode } from "@/utils/admin/token"

interface IRequestBody {
  emailAddress: string
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<string>>> => {
  const { emailAddress } = (await request.json()) as IRequestBody

  const validEmail = validateEmailAddress(emailAddress)

  if (!validEmail) {
    return NextResponse.json(
      { data: "Invalid email address.", outcome: "error" },
      {
        status: 400,
      },
    )
  }

  const account = getAccountByAddress(EnumAccountType.Email, emailAddress)

  if (!account) {
    return NextResponse.json(
      { data: "Account could not be found.", outcome: "error" },
      {
        status: 404,
      },
    )
  }

  // Create access Code
  const accessCode = generateAccessCode()

  // Set expiry date to 15 minutes from now
  const formattedDate = format(
    addMinutes(new Date(), 15),
    "yyyy-MM-dd HH:mm:ss",
  )

  // Save to the DB
  const accessCodeCreated = saveAccessCode(
    account.id,
    accessCode,
    formattedDate,
  )

  if (!accessCodeCreated) {
    return NextResponse.json(
      { data: "Error creating access code.", outcome: "error" },
      {
        status: 500,
      },
    )
  }

  // Send the access code to the email address

  const emailSent = await sendAccessCode(emailAddress, accessCode)

  if (!emailSent) {
    return NextResponse.json(
      {
        data: "Error sending access code email.",
        outcome: "error",
      },
      {
        status: 500,
      },
    )
  }

  // Return success
  return NextResponse.json({ data: "Access code sent.", outcome: "success" })
}
