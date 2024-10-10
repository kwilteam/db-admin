import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DeleteDeploymentModal from "@/components/Modal/DeleteDeployment"
import DeleteDeploymentButton from "@/components/Firebird/Deployments/ExistingDeployment/SelectedDeployment/DeleteDeploymentButton"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { ModalEnum } from "@/store/global"
import { deleteDeployment } from "@/utils/firebird/api"

// Mock the next/navigation module
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the deleteDeployment function
vi.mock("@/utils/firebird/api", () => ({
  deleteDeployment: vi.fn().mockResolvedValue({ status: 200 }),
}))

// Import the mocked module

const instanceName = "test-instance"

describe("DeleteDeploymentModal", () => {
  const initialState = {
    global: {
      modal: ModalEnum.DELETE_DEPLOYMENT,
      modalData: {
        deploymentId: "test-deployment-id",
      },
    },
    firebird: {
      selectedDeployment: {
        id: "test-deployment-id",
        config: {
          machines: {
            instance_name: instanceName,
          },
        },
      },
    },
  }

  const store = mockStore(initialState)

  it("renders the DeleteDeploymentModal component when triggered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteDeploymentModal />
        </Provider>,
      )
    })

    expect(
      screen.getByTestId("delete-deployment-modal-confirmation"),
    ).toBeInTheDocument()
    expect(screen.getByText(instanceName)).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
  })

  it("disables the Delete button when instance name is not entered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteDeploymentModal />
        </Provider>,
      )
    })

    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled()
  })

  it("enables the Delete button when correct instance name is entered", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteDeploymentModal />
        </Provider>,
      )
    })

    const input = screen.getByRole("textbox")
    await act(async () => {
      fireEvent.change(input, { target: { value: instanceName } })
    })

    expect(screen.getByRole("button", { name: "Delete" })).toBeEnabled()
  })

  it("calls deleteDeployment when Delete button is clicked", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteDeploymentModal />
        </Provider>,
      )
    })

    const input = screen.getByRole("textbox")
    await act(async () => {
      fireEvent.change(input, { target: { value: instanceName } })
    })

    const deleteButton = screen.getByRole("button", { name: "Delete" })
    await act(async () => {
      fireEvent.click(deleteButton)
    })

    expect(deleteDeployment).toHaveBeenCalledWith("test-deployment-id")
  })
})
