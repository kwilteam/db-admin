import { NextResponse } from "next/server"
import { executeAction } from "@/utils/kwil-provider"
import { IApiResponse } from "@/utils/api"
import { KwilTypes } from "@/utils/database-types"

interface INextRequest {
  request: Request
  params: {
    db: string
    action: string
  }
}

interface IActionInputs {
  inputs: Record<string, string>
}

export const POST = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<KwilTypes.TxReceipt | string>>> => {
  const { db, action } = params
  const { inputs } = (await request.json()) as IActionInputs

  const result = await executeAction(db, action, inputs)

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json({
      status: result?.status ?? 400,
      data: "Error executing action",
    } as IApiResponse<string>)
  }

  console.log("Get Table data API:", result)

  return NextResponse.json({
    status: 200,
    data: result.data,
  } as IApiResponse<KwilTypes.TxReceipt>)
}
