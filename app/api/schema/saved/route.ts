import { NextResponse } from "next/server"
import { IApiResponse, ISavedSchemasResponse } from "@/utils/api"
import { getSavedSchemas } from "@/utils/schemas"

interface INextRequest {
  request: Request
}

export const GET = async (request: Request) => {
  try {
    const savedSchemas = await getSavedSchemas()

    return NextResponse.json({
      status: 200,
      data: {
        savedSchemas,
      },
    } as IApiResponse<ISavedSchemasResponse>)
  } catch (e) {
    return NextResponse.json({
      status: 404,
      data: "Schema not found",
    } as IApiResponse<string>)
  }
}
