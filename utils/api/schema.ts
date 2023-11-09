import { IApiResponse, apiRequest } from "."

export interface ISchemaContentResponse {
  schemaContent: string
}

export interface ISavedSchemasResponse {
  savedSchemas: string[]
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
