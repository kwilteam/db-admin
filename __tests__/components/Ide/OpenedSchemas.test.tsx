import { beforeEach, describe, expect, it } from "vitest"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../../mocks/mock-store"
import OpenedSchemas from "@/components/Ide/OpenedSchemas"

const storeData = mockStore({
  ide: {
    openSchemas: ["Schema 1", "Schema 2"],
    activeSchema: "Schema 1",
    schemaContentDict: {
      "Schema 1": "Schema 1 content",
      "Schema 2": "Schema 2 content",
    },
  },
})

describe("OpenedSchemas Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <OpenedSchemas />
        </Provider>,
      )
    })
  })

  it("renders without crashing", () => {
    expect(screen.getByText(/Schema 1.sql/)).toBeInTheDocument()
    expect(screen.getByText(/Schema 2.sql/)).toBeInTheDocument()
  })

  it("displays all open schemas", () => {
    const schema1Tab = screen.getByTestId("Schema 1-schema-tab")
    const schema2Tab = screen.getByTestId("Schema 2-schema-tab")
    expect(schema1Tab).toHaveTextContent("Schema 1.sql")
    expect(schema2Tab).toHaveTextContent("Schema 2.sql")
  })

  it("closes a schema when close icon is clicked", async () => {
    const closeIcon = screen.getAllByText("x")[0] // Assuming 'x' is used for closing
    fireEvent.click(closeIcon)

    await waitFor(() => {
      expect(screen.queryByText(/Schema 1/)).not.toBeInTheDocument()
    })
  })
})
