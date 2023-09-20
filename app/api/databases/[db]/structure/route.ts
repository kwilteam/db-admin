import { NextResponse } from "next/server"
import { KwilTypes } from "@/util/database-types"
import { getKwilDatabaseStructure } from "@/util/kwil-provider"
import { Kwil } from "kwil/dist/client/kwil"
import { IApiResponse } from "@/util/api"

interface INextRequest {
  request: Request
  params: {
    db: string
  }
}

export const GET = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<KwilTypes.Database<string>>>> => {
  // In the short term, return the same response irrespective of the name argument
  const { db } = params

  const databaseStructure = await getKwilDatabaseStructure(db)

  console.log("Get Object for DB:", db)

  // TODO: Return object for database from the Kwil Provider

  if (!databaseStructure) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    } as IApiResponse<KwilTypes.Database<string>>)
  }

  return NextResponse.json({
    status: 200,
    data: databaseStructure,
  } as unknown as IApiResponse<KwilTypes.Database<string>>)
}
