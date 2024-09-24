import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import NodeServices from "@/components/Firebird/Deployments/ExistingDeployment/NodeServices"
import { mockStore } from "@/__tests__/mocks/mock-store"

const mockServices = [
  {
    id: "service-1",
    name: "Service 1",
    running: true,
  },
  {
    id: "service-2",
    name: "Service 2",
    running: false,
  },
]

// Mock the hooks
const useNodeServicesMock = vi.fn()

vi.mock("@/hooks/firebird/use-node-services", () => {
  return {
    __esModule: true,
    /* eslint-disable react-hooks/rules-of-hooks */
    default: () => useNodeServicesMock(),
  }
})

describe("NodeServices", () => {
  const store = mockStore({
    firebird: {
      selectedDeployment: {
        id: "test-deployment-id",
      },
    },
  })

  it("renders NodeServices component with services", () => {
    useNodeServicesMock.mockReturnValue({
      services: mockServices,
      loading: false,
    })

    render(
      <Provider store={store}>
        <NodeServices nodeId="test-node-id" />
      </Provider>,
    )

    expect(screen.getByText("Service 1")).toBeInTheDocument()
    expect(screen.getByText("Service 2")).toBeInTheDocument()
  })

  it("displays 'No services found' when there are no services", () => {
    useNodeServicesMock.mockReturnValue({
      services: [],
      loading: false,
    })

    render(
      <Provider store={store}>
        <NodeServices nodeId="test-node-id" />
      </Provider>,
    )

    expect(screen.getByText("No services found")).toBeInTheDocument()
  })

  it("displays loader when loading", () => {
    useNodeServicesMock.mockReturnValue({
      services: undefined,
      loading: true,
    })

    render(
      <Provider store={store}>
        <NodeServices nodeId="test-node-id" />
      </Provider>,
    )

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument()
  })
})
