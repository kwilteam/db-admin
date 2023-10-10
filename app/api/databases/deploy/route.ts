import { NextResponse } from "next/server"
import { IApiResponse } from "@/utils/api"
import { TxReceipt } from "@/utils/database-types"
import { deployDatabase } from "@/utils/kwil/database"

interface IDeployProps {
  dbDefinition: string
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<TxReceipt | string>>> => {
  const { dbDefinition } = (await request.json()) as IDeployProps

  const result = await deployDatabase(dbDefinition)

  if ("code" in result) {
    return NextResponse.json(
      {
        outcome: "error",
        data: result.message,
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  } else if (result?.status !== 200 || !result?.data) {
    return NextResponse.json(
      {
        outcome: "error",
        data: "Error deploying database",
      } as IApiResponse<string>,
      {
        status: result?.status ?? 400,
      },
    )
  }

  return NextResponse.json(
    {
      outcome: "success",
      data: result.data,
    } as IApiResponse<TxReceipt>,
    {
      status: 200,
    },
  )
}
