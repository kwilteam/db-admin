import { getTableData } from "@/utils/kwil-provider"
import { NextResponse } from "next/server"
import { IApiResponse } from "@/utils/api"

interface INextRequest {
  request: Request
  params: {
    db: string
    table: string
  }
}

export const GET = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<Object[] | string>>> => {
  const { db, table } = params

  const result = await getTableData(db, table)

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json({
      status: 404,
      data: "Error fetching table data",
    } as IApiResponse<string>)
  }

  console.log("Get Table data API:", result)

  return NextResponse.json({
    status: 200,
    data: result.data,
  } as IApiResponse<Object[]>)
}
