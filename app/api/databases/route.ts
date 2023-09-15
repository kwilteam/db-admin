import { NextResponse } from "next/server"
import { DatabaseDictionary } from "@/util/kwil-types"

interface IResponse {
  data: DatabaseDictionary | undefined
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

const getDatabases = async (): Promise<DatabaseDictionary> => {
  // TODO: Return list of databases from the Kwil Provider
  return {
    posts: null,
    users: null,
    comments: null,
  }
}
