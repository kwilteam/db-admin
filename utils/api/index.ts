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

const createUrl = (path: string): string => {
  if (!window)
    throw new Error(
      "This method cannot be called on the server. No window object found.",
    )

  const url = new URL(path, window.location.origin)
  return url.toString()
}

export const apiRequest = async (
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
      credentials: "same-origin", // include
    }),
  )
  return response
}
export {
  createInitialAccount,
  createAdminPk,
  generateMnemonic,
  emailSignIn,
  requestAccessCode,
  walletRequestMessage,
  walletSignIn,
  getUserInfo,
} from "./auth"

export {
  getAccounts,
  getAccountTypes,
  getAccount,
  saveAccount,
  deleteAccount,
} from "./accounts"

export {
  getDatabaseStructure,
  getDatabases,
  getTableData,
  deployDatabase,
  deleteDatabase,
  executeAction,
} from "./database"

export {
  getSavedSchemas,
  getSchemaContent,
  saveSchemaContent,
  deleteSchema,
} from "./schema"

export { getExtensions, getExtension } from "./extensions"
