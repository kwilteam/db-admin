import { NextResponse } from "next/server"
import { IDatabaseStructureDict } from "@/util/database-types"

interface IResponse {
  data: IDatabaseStructureDict | undefined
  status?: number
}

export const GET = async (): Promise<NextResponse<IResponse>> => {
  const databases = await getDatabases()

  if (!databases) {
    return NextResponse.json({
      data: undefined,
      status: 404,
    } as IResponse)
  }

  console.log("Get Databases API:", databases)

  return NextResponse.json({
    data: databases,
    status: 200,
  } as IResponse)
}

const getDatabases = async (): Promise<IDatabaseStructureDict> => {
  // TODO: Return list of databases from the Kwil Provider
  return {
    posts: null,
    users: null,
    comments: null,
    more: null,
    another: null,
    again: null,
  }
}
