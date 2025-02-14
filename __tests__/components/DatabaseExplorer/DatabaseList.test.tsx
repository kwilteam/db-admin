import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, render, screen, RenderResult } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../../mocks/mock-store"
import DatabaseList from "@/components/DatabaseExplorer/DatabaseList"
import { myDatabases, otherDatabases, storeData } from "./data"

describe("DatabaseList Component Tests", () => {
  let rerender: RenderResult["rerender"]

  beforeEach(async () => {
    const renderResult = render(
      <Provider store={storeData}>
        <DatabaseList
          databases={myDatabases}
          loading={false}
          isMobile={false}
          isDbOwner={true}
        />
      </Provider>,
    )
    rerender = renderResult.rerender
  })

  it("renders the database list component", async () => {
    expect(screen.getByTestId("database-list")).toBeInTheDocument()
  })

  it("displays the correct number of databases", async () => {
    const databases = screen.getByTestId("database-list").querySelectorAll("li")
    expect(databases.length).toBe(2)
  })

  it("filters databases based on search input", async () => {
    // Modify the store for this specific test
    const updatedStoreData = mockStore({
      ...storeData.getState(),
      database: {
        ...storeData.getState().database,
        filters: {
          ...storeData.getState().database.filters,
          search: "2",
        },
      },
    })

    // Re-render the component with the updated store
    await act(async () => {
      rerender(
        <Provider store={updatedStoreData}>
          <DatabaseList
            databases={myDatabases}
            loading={false}
            isMobile={false}
            isDbOwner={true}
          />
        </Provider>,
      )
    })

    expect(screen.getByTestId("database-item-2")).toBeInTheDocument()
    expect(screen.queryByTestId("database-item-1")).toBeNull()
  })

  it("shows other databases", async () => {
    // Re-render the component with the updated store
    await act(async () => {
      rerender(
        <Provider store={storeData}>
          <DatabaseList
            databases={otherDatabases}
            loading={false}
            isMobile={false}
            isDbOwner={false}
          />
        </Provider>,
      )
    })

    expect(screen.getByTestId("database-item-3")).toBeInTheDocument()
    expect(screen.getByTestId("database-item-4")).toBeInTheDocument()

    expect(screen.queryByTestId("database-item-1")).toBeNull()
    expect(screen.queryByTestId("database-item-2")).toBeNull()
  })
})
