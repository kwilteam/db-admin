import { NextResponse } from "next/server"
import { getAccounts } from "@/utils/admin-db/db"
import { IApiResponse } from "@/utils/api"
import { IAccount } from "@/utils/admin-db/schema"

export const GET = async (): Promise<
  NextResponse<IApiResponse<IAccount[] | undefined>>
> => {
  try {
    const accounts = getAccounts()

    return NextResponse.json(
      {
        data: accounts,
        outcome: "success",
      } as IApiResponse<IAccount[]>,
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
