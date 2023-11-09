import { NextResponse } from "next/server"
import { addMinutes, format } from "date-fns"
import { saveAccessCode, getAccountByAddress } from "@/utils/admin/db"
import { IApiResponse } from "@/utils/api"
import { buildMessage } from "@/utils/wallet"

interface IRequestBody {
  address: string
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<string>>> => {
  const { address } = (await request.json()) as IRequestBody

  const account = getAccountByAddress("wallet", address)

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-6)}`

  if (!account) {
    return NextResponse.json(
      {
        data: `Account ${shortAddress} not found.`,
        outcome: "error",
      },
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
      { data: "Error creating access code.", outcome: "error" },
      {
        status: 500,
      },
    )
  }

  const message = buildMessage(accessCode.toString(), formattedDate)

  // Return access code to be signed along with date
  return NextResponse.json({
    data: message,
    outcome: "success",
  })
}
