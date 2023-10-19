import { NextResponse } from "next/server"
import { getAccount } from "@/utils/admin-db/db"
import { IApiResponse } from "@/utils/api"
import { IAccount } from "@/utils/admin-db/schema"

interface INextRequest {
  request: Request
  params: {
    id: number
  }
}

export const GET = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<IAccount | undefined>>> => {
  const { id } = params

  try {
    const account = getAccount(id)

    if (!account) {
      return NextResponse.json(
        {
          data: undefined,
        } as IApiResponse<undefined>,
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(
      {
        data: account,
      } as IApiResponse<IAccount>,
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error("An error occurred while fetching accounts:", error)
    return NextResponse.json(
      {
        data: undefined,
      } as IApiResponse<undefined>,
      {
        status: 400,
      },
    )
  }
}
