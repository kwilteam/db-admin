import { getTableData, getTableTotalCount } from "@/utils/kwil/table"
import { NextResponse } from "next/server"
import { IApiResponse, ITableResponse } from "@/utils/api"
import { ITableQueryParams } from "@/utils/database-types"

interface INextRequest {
  request: Request
  params: {
    db: string
    table: string
  }
}

interface ICount {
  count: number
}

interface RequestBody {
  queryParams: ITableQueryParams
}

export const POST = async (
  request: Request,
  { params }: INextRequest,
): Promise<NextResponse<IApiResponse<ITableResponse | string>>> => {
  const { db, table } = params
  const { queryParams } = (await request.json()) as RequestBody

  console.log("POST", db, table, queryParams)

  const dataResult = await getTableData(db, table, queryParams)
  const countResult = await getTableTotalCount(db, table)

  if (dataResult?.status !== 200 || countResult?.status !== 200) {
    return NextResponse.json({
      status: dataResult?.status ?? 400,
      data: "Error fetching table data",
    } as IApiResponse<string>)
  }

  const countData = countResult.data?.[0] as ICount

  return NextResponse.json({
    status: 200,
    data: {
      tableData: dataResult.data,
      totalCount: countData.count,
    },
  } as IApiResponse<ITableResponse>)
}
