import { NextResponse } from "next/server"
import { executeAction } from "@/utils/kwil/action"
import { IApiResponse } from "@/utils/api"
import { TxReceipt } from "@/utils/database-types"

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
): Promise<NextResponse<IApiResponse<TxReceipt | string>>> => {
  const { db, action } = params
  const { inputs } = (await request.json()) as IActionInputs

  const result = await executeAction(db, action, inputs)

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json(
      {
        data: "Error executing action",
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
