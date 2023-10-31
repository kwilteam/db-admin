import { NextResponse } from "next/server"
import { saveAccessCode, getAccountByAddress } from "@/utils/admin-db/db"
import { addMinutes, format } from "date-fns"
import { sendAccessCode } from "@/utils/admin-db/auth"
import { validateEmailAddress } from "@/utils/validate"

interface IRequestBody {
  emailAddress: string
}

export const POST = async (request: Request) => {
  const { emailAddress } = (await request.json()) as IRequestBody

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

  // Create access Code
  const accessCode = Math.floor(100000 + Math.random() * 900000)

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
      { message: "Error creating access code." },
      {
        status: 500,
      },
    )
  }

  // Send the access code to the email address
  const emailSent = await sendAccessCode(emailAddress, accessCode)

  if (!emailSent) {
    return NextResponse.json(
      { message: "Error sending access code." },
      {
        status: 500,
      },
    )
  }

  // Return success
  return NextResponse.json({ message: "Access code sent." })
}
