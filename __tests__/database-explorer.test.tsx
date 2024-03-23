import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "./mocks/mock-store"
import DatabasesExplorer from "@/components/DatabaseExplorer"
import { KwilProviderStatus } from "@/store/providers"

const storeData = mockStore({
  database: {
    databases: [
      { dbid: "1", name: "Test Database 1", owner: "0x123" },
      { dbid: "2", name: "Test Database 2", owner: "0x456" },
    ],
    databaseFilters: {
      includeAll: true,
      search: "",
    },
  },
  global: {
    // Testing the explorer when provider is Online presents challenges with useRouter etc
    // It would be ideal to test the explorer when provider is online but this needs the Next router to be mocked
    providerStatus: KwilProviderStatus.Offline,
  },
})

describe("DatabaseExplorer Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <DatabasesExplorer />
        </Provider>,
      )
    })
  })

  it("renders without crashing", async () => {
    expect(screen.getByTestId("database-explorer")).toBeInTheDocument()
  })

  it("displays offline message", async () => {
    expect(screen.getByText("Kwil Provider is offline")).toBeInTheDocument()
  })
})
