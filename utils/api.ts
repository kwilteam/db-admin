import {
  IDatabaseStructureDict,
  ITableQueryParams,
  KwilTypes,
} from "./database-types"

export interface IApiResponse<T> {
  outcome?: "success" | "error"
  data: T
}

export interface ITxResponse {
  outcome: string
  message: string
}

export interface ITableResponse {
  tableData: Object[]
  totalCount: number
}

export interface ISchemaContentResponse {
  schemaContent: string
}

export interface ISavedSchemasResponse {
  savedSchemas: string[]
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
): Promise<KwilTypes.Database | undefined> => {
  const res = await apiRequest(`/api/databases/${db}/structure`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch database structure")
  }

  const json = (await res.json()) as IApiResponse<KwilTypes.Database>

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
): Promise<IApiResponse<string | Object[]>> => {
  const res = await apiRequest(
    `/api/databases/${db}/action/${action}`,
    "POST",
    {
      inputs,
    },
  )

  const json = (await res.json()) as IApiResponse<string | Object[]>

  console.log("Action result", json)

  return json
}

export const deployDatabase = async (
  dbDefinition: string | undefined,
): Promise<IApiResponse<KwilTypes.TxReceipt | string> | undefined> => {
  console.log("Deploying database", dbDefinition)
  if (!dbDefinition) {
    throw new Error("No database definition provided")
  }

  const res = await apiRequest(`/api/databases/deploy`, "POST", {
    dbDefinition,
  })

  const json = (await res.json()) as IApiResponse<KwilTypes.TxReceipt | string>

  return json
}

export const getSavedSchemas = async (): Promise<string[]> => {
  const res = await apiRequest(`/api/schema/saved`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch schemas")
  }

  const json = (await res.json()) as IApiResponse<ISavedSchemasResponse>

  return json.data.savedSchemas
}

export const getSchemaContent = async (schemaName: string): Promise<string> => {
  const res = await apiRequest(`/api/schema/${schemaName}`)

  if (res.status !== 200) {
    throw new Error("Failed to fetch schema")
  }

  const json = (await res.json()) as IApiResponse<ISchemaContentResponse>

  return json.data.schemaContent
}

export const saveSchemaContent = async (
  name: string,
  content: string,
): Promise<boolean> => {
  const res = await apiRequest(`/api/schema/${name}`, "POST", {
    content,
  })

  if (res.status !== 200) {
    throw new Error("Failed to save schema")
  }

  return true
}

export const deleteSchema = async (name: string): Promise<boolean> => {
  const res = await apiRequest(`/api/schema/${name}`, "DELETE")

  if (res.status !== 200) {
    throw new Error("Failed to delete schema")
  }

  return true
}

const createUrl = (path: string): string => {
  if (!window)
    throw new Error(
      "This method cannot be called on the server. No window object found.",
    )

  const url = new URL(path, window.location.origin)
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
