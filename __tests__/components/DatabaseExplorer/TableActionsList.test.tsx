import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { ItemTypes, KwilTypes } from "@/utils/database-types"
import { TablesActionsList } from "@/components/DatabaseExplorer/TablesActionsList"
import { storeData } from "./data"

describe("TablesActionsList Tables Component Tests", () => {
  const tables = [
    {
      name: "Table 1",
      columns: [],
      indexes: [],
      foreign_keys: [],
    },
    {
      name: "Table 2",
      columns: [],
      indexes: [],
      foreign_keys: [],
    },
  ] as readonly KwilTypes.Table[]

  const tablesListProps = {
    dbid: "1",
    items: tables,
    itemType: ItemTypes.TABLES,
    visible: true,
  }

  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <TablesActionsList {...tablesListProps} />
        </Provider>,
      )
    })
  })

  it("renders the tables list component", async () => {
    expect(
      screen.getByTestId("database-item-1-tables-Table 1"),
    ).toBeInTheDocument()
  })

  it("displays the correct number of tables", async () => {
    const items = screen.getAllByTestId(/database-item-1-tables/)
    expect(items.length).toBe(2)
  })

  it("displays the correct table names", async () => {
    expect(screen.getByText("Table 1")).toBeInTheDocument()
    expect(screen.getByText("Table 2")).toBeInTheDocument()
  })
})

describe("TablesActionsList Actions Component Tests", () => {
  const actions = [
    {
      name: "Action 1",
      inputs: [],
      statements: [],
      mutability: "view",
      annotations: [],
      auxiliaries: [],
      public: true,
    },
    {
      name: "Action 2",
      inputs: [],
      statements: [],
      mutability: "view",
      annotations: [],
      auxiliaries: [],
      public: true,
    },
  ] as readonly KwilTypes.ActionSchema[]

  const actionsListProps = {
    dbid: "1",
    items: actions,
    itemType: ItemTypes.ACTIONS,
    visible: true,
  }

  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={storeData}>
          <TablesActionsList {...actionsListProps} />
        </Provider>,
      )
    })
  })

  it("renders the actions list component", async () => {
    expect(
      screen.getByTestId("database-item-1-actions-Action 1"),
    ).toBeInTheDocument()
  })

  it("displays the correct number of actions", async () => {
    const items = screen.getAllByTestId(/database-item-1-actions/)
    expect(items.length).toBe(2)
  })

  it("displays the correct action names", async () => {
    expect(screen.getByText("Action 1")).toBeInTheDocument()
    expect(screen.getByText("Action 2")).toBeInTheDocument()
  })
})
