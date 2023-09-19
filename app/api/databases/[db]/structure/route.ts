import { NextResponse } from "next/server"
import { KwilTypes } from "@/util/database-types"
import databaseStructure from "./example_db_structure.json" // TODO: Temp whilst developing UI

interface IResponse {
  data: KwilTypes.Database<string> | undefined
  status?: number
}

interface INextRequest {
  request: Request
  params: {
    db: string
  }
}

export const GET = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IResponse>> => {
  // In the short term, return the same response irrespective of the name argument
  const { db } = params

  console.log("Get Object for DB:", db)

  // TODO: Return object for database from the Kwil Provider

  if (!databaseStructure) {
    return NextResponse.json({
      data: undefined,
      status: 404,
    } as IResponse)
  }

  return NextResponse.json({
    data: databaseStructure,
    status: 200,
  } as unknown as IResponse)
}
