import { IApiResponse, apiRequest } from "."
import { IAccount, IAccountType, IAccountWithType } from "../admin/schema"

export const getAccounts = async (): Promise<
  IApiResponse<IAccountWithType[]>
> => {
  const res = await apiRequest(`/api/accounts`)

  if (res.status !== 200) {
    throw new Error("Failed to get accounts")
  }

  const json = (await res.json()) as IApiResponse<IAccountWithType[]>

  return json
}

export const getAccountTypes = async (): Promise<
  IApiResponse<IAccountType[]>
> => {
  const res = await apiRequest(`/api/accounts/types`)

  if (res.status !== 200) {
    throw new Error("Failed to get account types")
  }

  const json = (await res.json()) as IApiResponse<IAccountType[]>

  return json
}

export const getAccount = async (
  id: number,
): Promise<IApiResponse<IAccountWithType>> => {
  const res = await apiRequest(`/api/accounts/${id}`)

  if (res.status !== 200) {
    throw new Error("Failed to get account")
  }

  const json = (await res.json()) as IApiResponse<IAccountWithType>

  return json
}

export const saveAccount = async (
  account: IAccount,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/accounts/${account.id}`, "POST", {
    name: account.name,
    type_id: account.type_id,
    address: account.address,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  if (res.status !== 200) {
    throw new Error(json.data as string)
  }

  return json
}

export const deleteAccount = async (
  id: number,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/accounts/${id}`, "DELETE")

  const json = (await res.json()) as IApiResponse<string | undefined>

  if (res.status !== 200) {
    throw new Error(json.data as string)
  }

  return json
}
