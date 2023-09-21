import { IDatabaseStructureDict, KwilTypes } from "./database-types"

export interface IApiResponse<T> {
  status?: number
  data: T
}

export const getDatabases = async (): Promise<
  IDatabaseStructureDict | undefined
> => {
  const res = await apiRequest("/api/databases")

  if (res.status !== 200) {
    throw new Error("Failed to fetch databases")
  }

  const json = (await res.json()) as IApiResponse<IDatabaseStructureDict>

  return json.data
}

export const getDatabaseStructure = async (
  db: string,
): Promise<KwilTypes.Database<string> | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/structure`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch database structure")
  }

  const json = (await res.json()) as IApiResponse<KwilTypes.Database<string>>

  return json.data
}

// TODO: Will need to include pagination, sorting, and filtering
export const getTableData = async (
  db: string,
  table: string,
): Promise<Object[] | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/table/${table}`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch table data")
  }

  const json = (await res.json()) as IApiResponse<Object[]>
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
