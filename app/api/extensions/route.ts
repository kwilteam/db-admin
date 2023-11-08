import { IExtensionFilter } from "@/store/extensions"
import { getExtensions } from "@/utils/kwil/extensions"
import { NextRequest, NextResponse } from "next/server"

interface IRequestBody {
  filters: IExtensionFilter
}

export const POST = async (request: NextRequest) => {
  const { filters } = (await request.json()) as IRequestBody

  const extensions = await getExtensions(filters)

  if (!extensions) {
    return NextResponse.json(
      { data: "Extensions could not be found", outcome: "error" },
      {
        status: 400,
      },
    )
  }

  return NextResponse.json(
    { data: extensions, outcome: "success" },
    {
      status: 200,
    },
  )
}
