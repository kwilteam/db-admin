import { NextResponse } from "next/server"
import { KwilTypes } from "@/utils/database-types"
import { dropDatabase } from "@/utils/kwil/database"
import { IApiResponse } from "@/utils/api"

interface INextRequest {
  request: Request
  params: {
    db: string
  }
}

export const GET = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<KwilTypes.Database | string>>> => {
  const { db } = params

  try {
    const txResponse = await dropDatabase(db)

    if (txResponse instanceof Error) {
      throw txResponse
    } else {
      return NextResponse.json(
        {
          outcome: txResponse.outcome,
          data: txResponse.message,
        } as IApiResponse<string>,
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
