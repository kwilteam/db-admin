import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen, RenderResult } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DatabasesExplorer from "@/components/DatabaseExplorer"
import { storeData } from "./data"

describe("DatabaseExplorer Component Suite", () => {
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
