import { NextResponse } from "next/server"
import { getAccountTypes } from "@/utils/admin/db"
import { IApiResponse } from "@/utils/api"
import { IAccountType } from "@/utils/admin/schema"

export const GET = async (): Promise<
  NextResponse<IApiResponse<IAccountType[] | undefined>>
> => {
  try {
    const accounts = getAccountTypes()

    return NextResponse.json(
      {
        data: accounts,
        outcome: "success",
      } as IApiResponse<IAccountType[]>,
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error("An error occurred while fetching accounts:", error)
    return NextResponse.json(
      {
        data: undefined,
        outcome: "error",
      } as IApiResponse<undefined>,
      {
        status: 400,
      },
    )
  }
}
