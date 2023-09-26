import {
  IDatabaseStructureDict,
  ITableQueryParams,
  KwilTypes,
  TxReceipt,
} from "./database-types"

export interface IApiResponse<T> {
  status?: number
  data: T
}

export interface ITableResponse {
  tableData: Object[]
  totalCount: number
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
  queryParams: ITableQueryParams | undefined,
): Promise<ITableResponse | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/table/${table}`, "POST", {
    queryParams,
  })

  if (res.status !== 200) {
    throw new Error("Failed to fetch table data")
  }

  const json = (await res.json()) as IApiResponse<ITableResponse>
  return json.data
}

export const executeAction = async (
  db: string,
  action: string,
  inputs: Record<string, string>,
): Promise<Object[] | undefined> => {
  const res = await apiRequest(
    `/api/databases/${db}/action/${action}`,
    "POST",
    {
      inputs,
    },
  )

  if (res.status !== 200) {
    throw new Error("Failed to execute action")
  }

  const json = (await res.json()) as IApiResponse<TxReceipt>

  // return undefined
  return json.data.body
}

const createUrl = (path: string): string => {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL)
  return url.toString()
}

const apiRequest = async (
  path: string,
  method: string = "GET",
  body?: Record<string, unknown>,
): Promise<Response> => {
  const url = createUrl(path)
  const response = await fetch(
    new Request(url, {
      body: JSON.stringify(body),
      method,
      cache: "no-store", // Make sure we're not getting a cached response
    }),
  )
  return response
}
