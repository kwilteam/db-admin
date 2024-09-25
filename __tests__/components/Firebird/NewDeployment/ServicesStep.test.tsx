import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { ServicesStep } from "@/components/Firebird/Deployments/NewDeployment/Step/Services"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

describe("ServicesStep", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        services: {
          daemon: true,
          gateway: false,
          indexer: false,
          customBinary: false,
        },
      },
    },
  })

  it("renders service options", () => {
    render(
      <Provider store={store}>
        <ServicesStep />
      </Provider>,
    )

    expect(screen.getByTestId("kwild-postgres-option")).toBeInTheDocument()
    expect(screen.getByTestId("kwil-gateway-option")).toBeInTheDocument()
    expect(screen.getByTestId("kwil-indexer-option")).toBeInTheDocument()
    expect(screen.getByTestId("custom-binary-option")).toBeInTheDocument()
  })

  it("allows selection of services", () => {
    render(
      <Provider store={store}>
        <ServicesStep />
      </Provider>,
    )
    const gatewayOption = screen.getByTestId("kwil-gateway-option")
    fireEvent.click(gatewayOption)

    expect(store.getState().firebird.newDeployment?.services?.gateway).toBe(
      true,
    )
  })
})
