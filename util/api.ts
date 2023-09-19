import { IDatabaseStructureDict, KwilTypes } from "./database-types"

export const getDatabases = async (): Promise<
  IDatabaseStructureDict | undefined
> => {
  const res = await apiRequest("/api/databases")

  if (res.status !== 200) {
    throw new Error("Failed to fetch databases")
  }

  const json = await res.json()

  console.log("Get Databases Client:", json)
  return json.data
}

export const getDatabaseObject = async (
  db: string,
): Promise<KwilTypes.Database<string> | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/structure`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch database object")
  }

  const json = await res.json()

  console.log("Get Database Object Client:", json)
  return json.data
}

const createUrl = (path: string): string => {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL)
  return url.toString()
}

const apiRequest = async (
  path: string,
  method: string = "GET",
): Promise<Response> => {
  const url = createUrl(path)
  const response = await fetch(
    new Request(url, {
      method,
      cache: "no-store", // Make sure we're not getting a cached response
    }),
  )
  return response
}
