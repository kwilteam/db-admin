import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DeleteNodeModal from "@/components/Modal/DeleteNode"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { ModalEnum } from "@/store/global"

// Mock the next/navigation module
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

const instanceName = "test-instance"

describe("DeleteNodeModal", () => {
  const initialState = {
    global: {
      modal: ModalEnum.DELETE_NODE,
      modalData: {
        deploymentId: "test-deployment-id",
        nodeId: "test-node-id",
        onlyNode: false,
      },
    },
    firebird: {
      selectedDeployment: {
        config: {
          machines: {
            instance_name: instanceName,
          },
        },
      },
    },
  }

  const store = mockStore(initialState)

  it("renders the DeleteNodeModal component when triggered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteNodeModal />
        </Provider>,
      )
    })

    expect(screen.getByTestId("delete-node-confirmation")).toBeInTheDocument()

    expect(screen.getByText(instanceName)).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
  })

  it("disables the Delete button when instance name is not entered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteNodeModal />
        </Provider>,
      )
    })

    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled()
  })

  it("enables the Delete button when correct instance name is entered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteNodeModal />
        </Provider>,
      )
    })

    const input = screen.getByRole("textbox")
    await act(async () => {
      fireEvent.change(input, { target: { value: instanceName } })
    })

    expect(screen.getByRole("button", { name: "Delete" })).toBeEnabled()
  })

  it("displays warning for deleting the only node", async () => {
    const storeWithOnlyNode = mockStore({
      ...initialState,
      global: {
        ...initialState.global,
        modalData: {
          ...initialState.global.modalData,
          onlyNode: true,
        },
      },
    })

    await act(async () => {
      render(
        <Provider store={storeWithOnlyNode}>
          <DeleteNodeModal />
        </Provider>,
      )
    })

    expect(screen.getByTestId("only-node-warning")).toBeInTheDocument()
  })
})
