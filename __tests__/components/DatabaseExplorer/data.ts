import { mockStore } from "../../mocks/mock-store"
import { KwilProviderStatus } from "@/store/providers"

export const activeAccount = "0x123"

export const myDatabases = [
  { name: "1"},
  { name: "2" },
]

export const otherDatabases = [
  { name: "3" },
  { name: "4" },
]

export const allDatabases = [...myDatabases, ...otherDatabases]

export const storeData = mockStore({
  database: {
    databases: allDatabases,
    filters: {
      includeAll: true,
      search: "",
    },
    visibilityDict: {
      "1": { TABLES: true, ACTIONS: false, QUERIES: false },
      "2": { TABLES: false, ACTIONS: true, QUERIES: true },
    },
  },
  global: {
    providerStatus: KwilProviderStatus.Offline,
    activeAccount: "0x123",
  },
})
