import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DatabaseItem from "@/components/DatabaseExplorer/DatabaseItem"
import { ItemTypes } from "@/utils/database-types"
import { storeData } from "./data"

describe("DatabaseItem Component Tests", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <DatabaseItem
            database={{ dbid: "1", name: "Test Database 1", owner: "0x123" }}
            itemType={ItemTypes.TABLES}
          />
        </Provider>,
      )
    })
  })

  it("renders the database item component", async () => {
    expect(screen.getByTestId("database-item-1-tables")).toBeInTheDocument()
  })

  it("displays the correct item type", async () => {
    expect(screen.getByText("tables")).toBeInTheDocument()
  })
})
