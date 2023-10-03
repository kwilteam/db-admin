import { NextResponse } from "next/server"
import { IApiResponse, ISchemaContentResponse } from "@/utils/api"
import { getSchema, saveSchema } from "@/utils/schemas"

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

export const POST = async (request: Request, { params }: INextRequest) => {
  const { schema: name } = params

  const { content } = await request.json()
  try {
    await saveSchema(name, content)

    return NextResponse.json({
      status: 200,
      data: "Schema saved",
    } as IApiResponse<string>)
  } catch (e) {
    return NextResponse.json({
      status: 400,
      data: "Could not save schema",
    } as IApiResponse<string>)
  }
}
