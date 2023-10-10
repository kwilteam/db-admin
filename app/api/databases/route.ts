import { NextResponse } from "next/server"
import { IDatabaseStructureDict } from "@/utils/database-types"
import { getDatabases } from "@/utils/kwil/database"
import { IApiResponse } from "@/utils/api"

export const GET = async (): Promise<
  NextResponse<IApiResponse<IDatabaseStructureDict | string>>
> => {
  const result = await getDatabases()

  if (result?.status !== 200 || !result?.data) {
    return NextResponse.json(
      {
        data: "Error fetching databases",
      } as IApiResponse<string>,
      {
        status: result?.status ?? 400,
      },
    )
  }

  const databases = await databasesToDict(result.data)

  return NextResponse.json(
    {
      data: databases,
    } as IApiResponse<IDatabaseStructureDict>,
    {
      status: 200,
    },
  )
}

const databasesToDict = async (
  databases: string[],
): Promise<IDatabaseStructureDict> => {
  const databaseStructureDict: IDatabaseStructureDict = {}

  for (const database of databases) {
    databaseStructureDict[database] = null
  }

  return databaseStructureDict
}
