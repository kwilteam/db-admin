import { NextResponse } from "next/server"
import { KwilTypes } from "@/util/database-types"
import schemaData from "./example_schema.json" // TODO: Temp whilst developing UI

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

  console.log("Get Schema for DB:", db)
  const schema = schemaData

  // TODO: Return schema for database from the Kwil Provider

  if (!schema) {
    return NextResponse.json({
      data: undefined,
      status: 404,
    } as IResponse)
  }

  return NextResponse.json({
    data: schema,
    status: 200,
  } as unknown as IResponse)
}
