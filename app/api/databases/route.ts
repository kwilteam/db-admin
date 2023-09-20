import { NextResponse } from "next/server"
import { IDatabaseStructureDict } from "@/util/database-types"
import { fetchKwilDatabases } from "@/util/kwil-provider"
import { IApiResponse } from "@/util/api"

export const GET = async (): Promise<
  NextResponse<IApiResponse<IDatabaseStructureDict>>
> => {
  const databases = await getDatabases()

  if (!databases) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    } as IApiResponse<IDatabaseStructureDict>)
  }

  console.log("Get Databases API:", databases)

  return NextResponse.json({
    status: 200,
    data: databases,
  } as IApiResponse<IDatabaseStructureDict>)
}

const getDatabases = async (): Promise<IDatabaseStructureDict | undefined> => {
  const res = await fetchKwilDatabases()

  if (res?.databases) {
    const databases = res.databases
    const databaseStructureDict: IDatabaseStructureDict = {}

    for (const database of databases) {
      databaseStructureDict[database] = null
    }

    return databaseStructureDict
  }
}
