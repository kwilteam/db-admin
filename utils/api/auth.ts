import { IApiResponse, apiRequest } from "."
import { EnumAccountType } from "../admin/schema"
import { IAccountJwt } from "../admin/token"

export const requestAccessCode = async (
  emailAddress: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/auth/email/access-code`, "POST", {
    emailAddress,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const emailSignIn = async (
  emailAddress: string,
  accessCode: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/auth/email/sign-in`, "POST", {
    emailAddress,
    accessCode,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const walletRequestMessage = async (
  address: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/auth/wallet/message`, "POST", {
    address,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const walletSignIn = async (
  address: string,
  signature: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/auth/wallet/sign-in`, "POST", {
    address,
    signature,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const getUserInfo = async (): Promise<
  IApiResponse<IAccountJwt | undefined>
> => {
  const res = await apiRequest(`/api/auth/user-info`)

  const json = (await res.json()) as IApiResponse<IAccountJwt | undefined>

  return json
}

export const createInitialAccount = async (
  name: string,
  typeId: EnumAccountType,
  address: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/auth/init-account`, "POST", {
    name,
    typeId,
    address,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const generateMnemonic = async (): Promise<
  IApiResponse<string | undefined>
> => {
  const res = await apiRequest(`/api/mnemonic/generate`)

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}

export const createAdminPk = async (
  mnemonic: string,
): Promise<IApiResponse<string | undefined>> => {
  const res = await apiRequest(`/api/mnemonic/create-account`, "POST", {
    mnemonic,
  })

  const json = (await res.json()) as IApiResponse<string | undefined>

  return json
}
