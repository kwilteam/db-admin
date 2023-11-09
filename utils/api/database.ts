import { IApiResponse, ITableResponse, apiRequest } from "."
import {
  IDatabaseStructureDict,
  ITableQueryParams,
  KwilTypes,
} from "../database-types"

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

export const deployDatabase = async (
  dbDefinition: string | undefined,
): Promise<IApiResponse<KwilTypes.TxReceipt | string> | undefined> => {
  if (!dbDefinition) {
    throw new Error("No database definition provided")
  }

  const res = await apiRequest(`/api/databases/deploy`, "POST", {
    dbDefinition,
  })

  const json = (await res.json()) as IApiResponse<KwilTypes.TxReceipt | string>

  return json
}

export const deleteDatabase = async (name: string): Promise<boolean> => {
  const res = await apiRequest(`/api/databases/${name}/drop`, "DELETE")

  if (res.status !== 200) {
    throw new Error("Failed to delete database")
  }

  return true
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
