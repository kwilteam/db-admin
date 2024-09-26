import { mockStore } from "../../mocks/mock-store"
import { KwilProviderStatus } from "@/store/providers"

export const activeAccount = "0x123"

export const myDatabases = [
  { dbid: "1", name: "Test Database 1", owner: activeAccount },
  { dbid: "2", name: "Test Database 2", owner: activeAccount },
]

export const otherDatabases = [
  { dbid: "3", name: "Test Database 3", owner: "0x456" },
  { dbid: "4", name: "Test Database 4", owner: "0x789" },
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
