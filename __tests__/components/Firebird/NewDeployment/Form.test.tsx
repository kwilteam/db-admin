import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { NewDeploymentForm } from "@/components/Firebird/Deployments/NewDeployment/Form"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

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
    expect(screen.getByTestId("step-1")).toBeInTheDocument()
    expect(screen.getByTestId("step-2")).toBeInTheDocument()
    expect(screen.getByTestId("step-3")).toBeInTheDocument()
    expect(screen.getByTestId("step-4")).toBeInTheDocument()
    expect(screen.getByTestId("step-5")).toBeInTheDocument()
  })
})
