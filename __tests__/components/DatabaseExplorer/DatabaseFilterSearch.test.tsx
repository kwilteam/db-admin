import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DatabaseFilterSearch from "@/components/DatabaseExplorer/DatabaseFilterSearch"
import { storeData } from "./data"

describe("DatabaseFilterSearch Component Tests", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <DatabaseFilterSearch />
        </Provider>,
      )
    })
  })

  it("renders the search input field", async () => {
    expect(screen.getByTestId("database-filter-search")).toBeInTheDocument()
  })

  it("updates the search field on user input", async () => {
    const searchInput = screen.getByTestId(
      "database-filter-search",
    ) as HTMLInputElement

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Test" } })
    })
    expect(searchInput.value).toBe("Test")
  })

  it("clears the search field when the clear button is clicked", async () => {
    const searchInput = screen.getByTestId(
      "database-filter-search",
    ) as HTMLInputElement

    // First, input some text
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Test" } })
    })

    // Wait for the clear button to be visible
    const clearButton = await screen.findByTestId(
      "database-filter-search-clear",
    )

    // Then, click the clear button
    await act(async () => {
      fireEvent.click(clearButton)
    })
    expect(searchInput.value).toBe("")
  })
})
