import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../../mocks/mock-store"
import DataTable from "@/components/DatabaseItem/DataTable"
import { ItemType } from "@/utils/database-types"

const mockColumns = ["id", "name", "age"]
const mockData = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
]

describe("DataTable Component", () => {
  describe("when data is loading", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <DataTable
              columns={mockColumns}
              data={undefined}
              totalCount={undefined}
              type={ItemType.TABLE}
              isLoading={true}
            />
          </Provider>,
        )
      })
    })

    it("renders loading component", () => {
      expect(screen.getByTestId("loading")).toBeInTheDocument()
    })
  })

  describe("when there is no data", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <DataTable
              columns={mockColumns}
              data={[]}
              totalCount={0}
              type={ItemType.QUERY}
              isLoading={false}
            />
          </Provider>,
        )
      })
    })

    it("renders no data alert", () => {
      expect(screen.getByText("No data found")).toBeInTheDocument()
    })
  })

  describe("when columns are not provided", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <DataTable
              columns={undefined}
              data={mockData}
              totalCount={2}
              type={ItemType.TABLE}
              isLoading={false}
            />
          </Provider>,
        )
      })
    })

    it("does not render the table", () => {
      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })
  })

  describe("when data is available", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <DataTable
              columns={mockColumns}
              data={mockData}
              totalCount={2}
              type={ItemType.TABLE}
              isLoading={false}
            />
          </Provider>,
        )
      })
    })

    it("renders the data table", () => {
      expect(screen.getByTestId("data-table")).toBeInTheDocument()
    })

    it("renders the correct number of rows", () => {
      expect(screen.getAllByRole("row").length).toBe(3) // 2 data rows + 1 header row
    })
  })
})
