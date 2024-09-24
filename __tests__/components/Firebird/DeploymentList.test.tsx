import { it, describe, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import DeploymentList from "@/components/Firebird/Deployments/DeploymentList"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { DeploymentStatus } from "@/utils/firebird/types"

describe("DeploymentList", () => {
  it("displays deployments when there are deployments", async () => {
    const store = mockStore({
      firebird: {
        deployments: [
          {
            status: 200,
            data: {
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
            },
          },
        ],
      },
    })

    render(
      <Provider store={store}>
        <DeploymentList />
      </Provider>,
    )

    const deploymentCards = await screen.findAllByTestId("deployment-card")
    expect(deploymentCards).toHaveLength(1)
  })

  it("displays 'Deploy your first Kwil network!' when there are no deployments", async () => {
    const store = mockStore({
      firebird: {
        deployments: [],
      },
    })

    render(
      <Provider store={store}>
        <DeploymentList />
      </Provider>,
    )

    expect(
      await screen.findByText("Deploy your first Kwil network!"),
    ).toBeInTheDocument()
  })
})
