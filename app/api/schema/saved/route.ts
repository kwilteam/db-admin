import { NextResponse } from "next/server"
import { IApiResponse, ISavedSchemasResponse } from "@/utils/api"
import { getSavedSchemas } from "@/utils/schemas"

interface INextRequest {
  request: Request
}

export const GET = async (request: Request) => {
  try {
    const savedSchemas = await getSavedSchemas()

    return NextResponse.json(
      {
        data: {
          savedSchemas,
        },
      } as IApiResponse<ISavedSchemasResponse>,
      {
        status: 200,
      },
    )
  } catch (e) {
    return NextResponse.json(
      {
        data: "Schema not found",
      } as IApiResponse<string>,
      {
        status: 404,
      },
    )
  }
}
