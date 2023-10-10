import { NextResponse } from "next/server"
import { executeAction } from "@/utils/kwil/action"
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
        data: result.message,
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  } else if (result?.status !== 200 || !result?.data) {
    return NextResponse.json(
      {
        data: "Error deploying database",
      } as IApiResponse<string>,
      {
        status: result?.status ?? 400,
      },
    )
  }

  return NextResponse.json(
    {
      data: result.data,
    } as IApiResponse<TxReceipt>,
    {
      status: 200,
    },
  )
}
