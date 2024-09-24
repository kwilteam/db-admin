import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import Nodes from "@/components/Firebird/Deployments/ExistingDeployment/Nodes"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { NodeStatus } from "@/utils/firebird/types"

const mockNodes = [
  {
    id: "node-1",
    status: NodeStatus.RUNNING,
  },
  {
    id: "node-2",
    status: NodeStatus.PENDING,
  },
]

// Mock the hooks
const useNodesMock = vi.fn()

vi.mock("@/hooks/firebird/use-nodes", () => {
  return {
    __esModule: true,
    /* eslint-disable react-hooks/rules-of-hooks */
    default: () => useNodesMock(),
  }
})

describe("Nodes", () => {
  const store = mockStore({
    firebird: {
      selectedDeployment: {
        id: "test-deployment-id",
      },
    },
  })

  it("renders Nodes component with nodes", () => {
    useNodesMock.mockReturnValue({
      nodes: mockNodes,
      loading: false,
    })

    render(
      <Provider store={store}>
        <Nodes deploymentId="test-deployment-id" />
      </Provider>,
    )

    expect(screen.getByText("Node #1")).toBeInTheDocument()
    expect(screen.getByText("Node #2")).toBeInTheDocument()
  })

  it("displays 'No nodes found' when there are no nodes", () => {
    useNodesMock.mockReturnValue({
      nodes: [],
      loading: false,
    })

    render(
      <Provider store={store}>
        <Nodes deploymentId="test-deployment-id" />
      </Provider>,
    )

    expect(screen.getByText("No nodes found")).toBeInTheDocument()
  })

  it("displays loader when loading", () => {
    useNodesMock.mockReturnValue({
      nodes: undefined,
      loading: true,
    })

    render(
      <Provider store={store}>
        <Nodes deploymentId="test-deployment-id" />
      </Provider>,
    )

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument()
  })
})
