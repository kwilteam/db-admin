import extensions from "./extensions.json"

import { IExtensionFilter, IKwilExtension } from "@/store/extensions"
export const getExtensions = async (
  filters: IExtensionFilter,
): Promise<IKwilExtension[]> => {
  return extensions.filter((e) => {
    if (filters.search.length > 0) {
      if (
        !e.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !e.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
    }

    if (filters.official === "true") {
      if (e.official !== filters.official) {
        return false
      }
    }

    if (filters.verified === "true") {
      if (e.verified !== filters.verified) {
        return false
      }
    }

    return true
  })
}

export const getExtension = async (id: number): Promise<IKwilExtension> => {
  const extensions = await getExtensions({
    search: "",
    official: "false",
    verified: "false",
  })

  return extensions.find((e) => e.id === Number(id)) as IKwilExtension
}
