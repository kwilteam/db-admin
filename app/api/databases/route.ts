import { NextResponse } from "next/server"
import { IDatabaseStructureDict } from "@/utils/database-types"
import { getKwilDatabases } from "@/utils/kwil-provider"
import { IApiResponse } from "@/utils/api"

export const GET = async (): Promise<
  NextResponse<IApiResponse<IDatabaseStructureDict | string>>
> => {
  const result = await getKwilDatabases()

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json({
      status: result?.status ?? 400,
      data: "Error fetching databases",
    } as IApiResponse<string>)
  }

  const databases = await getDatabases(result.data)

  return NextResponse.json({
    status: 200,
    data: databases,
  } as IApiResponse<IDatabaseStructureDict>)
}

const getDatabases = async (
  databases: string[],
): Promise<IDatabaseStructureDict> => {
  const databaseStructureDict: IDatabaseStructureDict = {}

  for (const database of databases) {
    databaseStructureDict[database] = null
  }

  return databaseStructureDict
}
