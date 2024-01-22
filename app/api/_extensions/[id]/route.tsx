import { getExtension } from "@/utils/kwil/extensions"
import { NextRequest, NextResponse } from "next/server"

interface INextRequest {
  request: Request
  params: {
    id: number
  }
}

export const GET = async (request: NextRequest, { params }: INextRequest) => {
  const { id } = params
  const extension = await getExtension(id)

  if (!extension) {
    return NextResponse.json(
      { data: "Extension could not be found", outcome: "error" },
      {
        status: 400,
      },
    )
  }

  return NextResponse.json(
    { data: extension, outcome: "success" },
    {
      status: 200,
    },
  )
}
