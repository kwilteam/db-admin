import { NextResponse } from "next/server"
import { executeAction } from "@/utils/kwil/action"
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
): Promise<NextResponse<IApiResponse<string | Object[]>>> => {
  const { db, action } = params
  const { inputs } = (await request.json()) as IActionInputs

  try {
    const txResponse = await executeAction(db, action, inputs)

    if (txResponse instanceof Error) {
      throw txResponse
    } else if ("outcome" in txResponse) {
      return NextResponse.json(
        {
          outcome: txResponse.outcome,
          data: txResponse.message,
        } as IApiResponse<string>,
        {
          status: txResponse.outcome === "success" ? 200 : 400,
        },
      )
    } else {
      return NextResponse.json(
        {
          outcome: "success",
          data: txResponse,
        } as IApiResponse<Object[]>,
        {
          status: 200,
        },
      )
    }
  } catch (error) {
    console.error(error)
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred"

    return NextResponse.json(
      {
        outcome: "error",
        data: errorMessage,
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}
