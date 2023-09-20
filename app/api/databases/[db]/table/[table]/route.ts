import { getTableData } from "@/util/kwil-provider"
import { NextResponse } from "next/server"
import { IApiResponse } from "@/util/api"

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
): Promise<NextResponse<IApiResponse<Object[]>>> => {
  const { db, table } = params

  const result = await getTableData(db, table)

  console.log(result, db, table)

  if (!result) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    } as IApiResponse<Object[]>)
  }

  console.log("Get Table data API:", result)

  return NextResponse.json({
    status: 200,
    data: result,
  } as IApiResponse<Object[]>)
}
