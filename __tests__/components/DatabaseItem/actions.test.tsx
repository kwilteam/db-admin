import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../../mocks/mock-store"
import Method from "@/components/DatabaseItem/Method"
import MethodForm from "@/components/DatabaseItem/Method/Form"
import MethodStatements from "@/components/DatabaseItem/Method/Statements"
import { IActionInfo, ItemType, KwilTypes } from "@/utils/database-types"

const mockDbid = "mock-dbid"
const mockActionName = "mock-action"
const mockAction: IActionInfo = {
  name: mockActionName,
  raw_statement: "statement1",
  access_modifiers: ["VIEW"],
  parameter_names: ["input1", "input2"],
  parameter_types: ["TEXT", "TEXT"],
  return_names: [],
  return_types: [],
  returns_table: false,
  built_in: false,
}

describe("Action Components", () => {
  describe("Action", () => {
    it("renders loading state when action is undefined", async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <Method
              dbid={mockDbid}
              methodName={mockActionName}
              type={ItemType.ACTION}
            />
          </Provider>,
        )
      })
      expect(screen.getByTestId("loading-icon")).toBeInTheDocument()
    })

    it("renders action statements and form when action is defined", async () => {
      await act(async () => {
        render(
          <Provider
            store={mockStore({
              database: {
                schemaDict: {
                  [mockDbid]: {
                    actions: [mockAction],
                  },
                },
              },
            })}
          >
            <Method
              dbid={mockDbid}
              methodName={mockActionName}
              type={ItemType.ACTION}
            />
          </Provider>,
        )
      })
      expect(screen.getByText(/Action Body/i)).toBeInTheDocument()
      expect(screen.getByText(/Inputs/i)).toBeInTheDocument()
    })
  })

  describe("ActionForm", () => {
    it("renders input fields for each action input", async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <MethodForm
              method={mockAction}
              executeAction={vi.fn()}
              type={ItemType.ACTION}
            />
          </Provider>,
        )
      })
      expect(screen.getByTestId("action-input-input1")).toBeInTheDocument()
      expect(screen.getByTestId("action-input-input2")).toBeInTheDocument()
    })

    it("renders execute action button", async () => {
      await act(async () => {
        render(
          <Provider store={mockStore({})}>
            <MethodForm
              method={mockAction}
              executeAction={vi.fn()}
              type={ItemType.ACTION}
            />
          </Provider>,
        )
      })
      expect(screen.getByTestId("execute-action")).toBeInTheDocument()
    })
  })

  describe("ActionStatements", () => {
    it("renders action statements", async () => {
      await act(async () => {
        render(
          <MethodStatements
            statements={[mockAction.raw_statement]}
            methodType={ItemType.ACTION}
          />,
        )
      })
      expect(screen.getByText("statement1")).toBeInTheDocument()
    })
  })
})
