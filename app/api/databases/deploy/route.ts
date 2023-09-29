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
    return NextResponse.json({
      status: 400,
      data: result.message,
    } as IApiResponse<string>)
  } else if (result?.status !== 200 || !result?.data) {
    return NextResponse.json({
      status: result?.status ?? 400,
      data: "Error deploying database",
    } as IApiResponse<string>)
  }

  return NextResponse.json({
    status: 200,
    data: result.data,
  } as IApiResponse<TxReceipt>)
}
