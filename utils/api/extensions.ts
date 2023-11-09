import { IExtensionFilter, IKwilExtension } from "@/store/extensions"
import { IApiResponse, apiRequest } from "."

export const getExtensions = async (
  filters: IExtensionFilter,
): Promise<IApiResponse<IKwilExtension[] | string>> => {
  const res = await apiRequest(`/api/extensions`, "POST", {
    filters,
  })

  const json = (await res.json()) as IApiResponse<IKwilExtension[] | string>

  return json
}

export const getExtension = async (
  id: number,
): Promise<IApiResponse<IKwilExtension | string>> => {
  const res = await apiRequest(`/api/extensions/${id}`)

  const json = (await res.json()) as IApiResponse<IKwilExtension | string>

  return json
}
