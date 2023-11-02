import { NextResponse } from "next/server"
import {
  addAccount,
  deleteAccount,
  getAccount,
  updateAccount,
} from "@/utils/admin/db"
import { IApiResponse } from "@/utils/api"
import { IAccount } from "@/utils/admin/schema"

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

export const POST = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<IAccount | undefined | string>>> => {
  const { id } = params
  const { name, type_id, address } = (await request.json()) as IAccount
  let result: number | bigint | undefined

  console.log("POST", id, name, type_id, address)

  try {
    if (Number(id) === 0) {
      result = addAccount(name, type_id, address)
    } else {
      result = updateAccount(id, name, type_id, address)
    }

    if (!result) {
      return NextResponse.json(
        {
          data: undefined,
        } as IApiResponse<undefined>,
        {
          status: 500,
        },
      )
    }

    return NextResponse.json(
      {
        data: undefined,
        outcome: "success",
      } as IApiResponse<undefined>,
      {
        status: 200,
      },
    )
  } catch (error) {
    const err = error as Error
    console.error("An error occurred while fetching accounts:", error)
    return NextResponse.json(
      {
        data: err.message,
        outcome: "error",
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}

export const DELETE = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<IAccount | undefined | string>>> => {
  const { id } = params

  console.log("DELETE", id)

  try {
    const result: boolean | undefined = deleteAccount(id)

    if (!result) {
      return NextResponse.json(
        {
          data: undefined,
        } as IApiResponse<undefined>,
        {
          status: 500,
        },
      )
    }

    return NextResponse.json(
      {
        data: undefined,
        outcome: "success",
      } as IApiResponse<undefined>,
      {
        status: 200,
      },
    )
  } catch (error) {
    const err = error as Error
    console.error("An error occurred while fetching accounts:", error)
    return NextResponse.json(
      {
        data: err.message,
        outcome: "error",
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}
