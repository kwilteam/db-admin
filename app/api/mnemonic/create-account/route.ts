import { NextRequest, NextResponse } from "next/server"
import { createAdminPk, createMnemonic } from "@/utils/admin/setup"

interface IRequestBody {
  mnemonic: string
}

export const POST = async (request: NextRequest) => {
  const { mnemonic } = (await request.json()) as IRequestBody

  const createdAccount = createAdminPk(mnemonic)

  if (!createdAccount) {
    return NextResponse.json(
      { data: "PK could not be generated", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  return NextResponse.json(
    { data: "Successfully created PK.", outcome: "success" },
    {
      status: 200,
    },
  )
}
