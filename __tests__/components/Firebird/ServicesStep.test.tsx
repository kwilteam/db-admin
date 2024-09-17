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

    expect(screen.getByText("KwilD + Postgres")).toBeInTheDocument()
    expect(screen.getByText("Kwil Gateway")).toBeInTheDocument()
    expect(screen.getByText("Kwil Indexer")).toBeInTheDocument()
    expect(screen.getByText("Custom Binary")).toBeInTheDocument()
  })

  it("allows selection of services", () => {
    render(
      <Provider store={store}>
        <ServicesStep />
      </Provider>,
    )
    const gatewayOption = screen.getByText("Kwil Gateway")
    fireEvent.click(gatewayOption)
    // Add assertion to check if the store was updated
  })
})
