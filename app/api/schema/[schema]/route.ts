import { NextResponse } from "next/server"
import { IApiResponse, ISchemaContentResponse } from "@/utils/api"
import { getSchema } from "@/utils/files"

interface INextRequest {
  request: Request
  params: {
    schema: string
  }
}

export const GET = async (request: Request, { params }: INextRequest) => {
  const { schema } = params

  try {
    const schemaContent = await getSchema(schema)
    return NextResponse.json({
      status: 200,
      data: {
        schemaContent,
      },
    } as IApiResponse<ISchemaContentResponse>)
  } catch (e) {
    return NextResponse.json({
      status: 404,
      data: "Schema not found",
    } as IApiResponse<string>)
  }
}
