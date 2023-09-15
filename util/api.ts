import { DatabaseDictionary, Database } from "./types"

export const getDatabases = async (): Promise<
  DatabaseDictionary | undefined
> => {
  const res = await apiRequest("/api/databases")

  if (res.status !== 200) {
    throw new Error("Failed to fetch databases")
  }

  const json = await res.json()

  console.log("Get Databases Client:", json)
  return json.data
}

export const getDatabaseSchema = async (
  db: string,
): Promise<Database<string> | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/schema`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch database schema")
  }

  const json = await res.json()

  console.log("Get Database Schema Client:", json)
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
