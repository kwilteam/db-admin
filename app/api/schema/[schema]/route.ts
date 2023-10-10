import { NextResponse } from "next/server"
import { IApiResponse, ISchemaContentResponse } from "@/utils/api"
import { getSchema, saveSchema, deleteSchema } from "@/utils/schemas"

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
    return NextResponse.json(
      {
        data: {
          schemaContent,
        },
      } as IApiResponse<ISchemaContentResponse>,
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

export const POST = async (request: Request, { params }: INextRequest) => {
  const { schema: name } = params

  const { content } = await request.json()
  try {
    await saveSchema(name, content)

    return NextResponse.json(
      {
        data: "Schema saved",
      } as IApiResponse<string>,
      {
        status: 200,
      },
    )
  } catch (e) {
    return NextResponse.json(
      {
        data: "Could not save schema",
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}

export const DELETE = async (request: Request, { params }: INextRequest) => {
  const { schema: name } = params

  try {
    await deleteSchema(name)

    return NextResponse.json(
      {
        data: "Schema deleted",
      } as IApiResponse<string>,
      {
        status: 200,
      },
    )
  } catch (e) {
    return NextResponse.json(
      {
        data: "Could not save schema",
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}
