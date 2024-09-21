import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import ExistingDeployment from "@/components/Firebird/Deployments/ExistingDeployment"
import { DeploymentStatus } from "@/utils/firebird/types"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the hooks
vi.mock("@/hooks/use-deployment-status-stream", () => ({
  __esModule: true,
  default: () => ({
    deploymentStatus: DeploymentStatus.ACTIVE,
    deploymentProgress: undefined,
  }),
}))

describe("ExistingDeployment", () => {
  const mockDeployment = {
    id: "test-id",
    status: DeploymentStatus.ACTIVE,
    config: {
      chain: {
        chain_id: "test-chain",
        version: "0.8.4",
      },
      node_count: 1,
      machines: {
        instance_name: "kwil-node",
        provider: "aws",
        region: "us-east-2",
        type: "mini",
      },
    },
    service_endpoints: {
      kwil_rpc_provider: "http://test-endpoint",
    },
    created_at: 1234567890,
    updated_at: 1234567890,
  }

  const store = mockStore({
    firebird: {
      selectedDeployment: mockDeployment,
    },
  })

  it("renders SelectedDeploymentCard", () => {
    render(
      <Provider store={store}>
        <ExistingDeployment id="test-id" />
      </Provider>,
    )
    expect(screen.getByTestId("selected-deployment-card")).toBeInTheDocument()
  })

  it("renders SelectedDeploymentTabs when deployment is active", () => {
    render(
      <Provider store={store}>
        <ExistingDeployment id="test-id" />
      </Provider>,
    )
    expect(screen.getByTestId("active-deployment-tabs")).toBeInTheDocument()
  })

  it("renders QuickConnect when deployment is active and has provider endpoint", () => {
    render(
      <Provider store={store}>
        <ExistingDeployment id="test-id" />
      </Provider>,
    )
    expect(screen.getByTestId("quick-connect")).toBeInTheDocument()
  })
})
