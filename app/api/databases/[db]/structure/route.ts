import { NextResponse } from "next/server"
import { KwilTypes } from "@/utils/database-types"
import { getDatabaseStructure } from "@/utils/kwil/database"
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

  const result = await getDatabaseStructure(db)

  console.log("Get Object for DB:", db)

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json(
      {
        data: "Error fetching database structure",
      } as IApiResponse<string>,
      {
        status: result?.status ?? 400,
      },
    )
  }

  const databaseStructure = result.data

  return NextResponse.json(
    {
      data: databaseStructure,
    } as unknown as IApiResponse<KwilTypes.Database>,
    {
      status: 200,
    },
  )
}
