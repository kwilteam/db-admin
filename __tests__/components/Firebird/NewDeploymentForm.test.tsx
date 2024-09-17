import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { NewDeploymentForm } from "@/components/Firebird/Deployments/NewDeployment/Form"
import { mockStore } from "@/__tests__/mocks/mock-store"

describe("NewDeploymentForm", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        network: "testnet",
        networkSettings: {},
        nodeCount: 1,
        machines: "mini",
        services: {},
        finalOptions: {},
      },
    },
  })

  it("renders all deployment steps", () => {
    render(
      <Provider store={store}>
        <NewDeploymentForm />
      </Provider>,
    )
    expect(screen.getByText("Select a network")).toBeInTheDocument()
    expect(screen.getByText("Network settings")).toBeInTheDocument()
    expect(screen.getByText("Node count")).toBeInTheDocument()
    expect(screen.getByText("Machine type")).toBeInTheDocument()
    expect(screen.getByText("Services")).toBeInTheDocument()
    expect(screen.getByText("Final options")).toBeInTheDocument()
  })
})
