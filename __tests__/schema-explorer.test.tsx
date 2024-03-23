import { beforeEach, describe, expect, it } from "vitest"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "./mocks/mock-store"
import SchemaExplorer from "@/components/Ide/SchemaExplorer"

const storeData = mockStore({
  ide: {
    savedSchemas: ["Schema 1", "Schema 2"],
  },
})

describe("SchemaExplorer Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <SchemaExplorer />
        </Provider>,
      )
    })
  })

  it("renders without crashing", async () => {
    expect(screen.getByText("Schemas")).toBeInTheDocument()
  })

  it("displays saved schemas", async () => {
    expect(screen.getByText(/Schema 1/)).toBeInTheDocument()
    expect(screen.getByText(/Schema 2/)).toBeInTheDocument()

    const createIcon = await screen.findByTestId("create-new-schema")
    fireEvent.click(createIcon)

    const input = await screen.findByRole("textbox")
    expect(input).toBeVisible()
  })

  it("shows create new schema input when icon is clicked", async () => {
    const createIcon = await screen.findByTestId("create-new-schema")
    fireEvent.click(createIcon)

    const input = await screen.findByTestId("new-schema-input")
    expect(input).toBeVisible()
  })

  it("adds new schema to store and hides create new schema icon after submission", async () => {
    const createIcon = await screen.findByTestId("create-new-schema")
    fireEvent.click(createIcon)
    const input = await screen.findByRole("textbox")
    fireEvent.change(input, { target: { value: "New Schema" } })
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      expect(screen.queryByTestId("new-schema-input")).not.toBeInTheDocument()
    })
  })
})
