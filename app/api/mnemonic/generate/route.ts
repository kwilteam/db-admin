import { NextResponse } from "next/server"
import { createMnemonic } from "@/utils/admin/setup"

export const GET = async () => {
  const mnemonic = createMnemonic()

  if (!mnemonic) {
    return NextResponse.json(
      { data: "Mnemonic not generated", outcome: "error" },
      {
        status: 401,
      },
    )
  }

  return NextResponse.json(
    { data: mnemonic, outcome: "success" },
    {
      status: 200,
    },
  )
}
