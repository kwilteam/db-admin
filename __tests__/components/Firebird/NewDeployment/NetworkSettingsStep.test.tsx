import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { NetworkSettingsStep } from "@/components/Firebird/Deployments/NewDeployment/Step/NetworkSettings"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

const kwilVersion = "0.9.3"

describe("NetworkSettingsStep", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        networkSettings: {
          chainId: "test-chain-id",
          kwilVersion,
          companyName: "Test Company",
        },
      },
    },
  })

  it("renders network settings fields", () => {
    render(
      <Provider store={store}>
        <NetworkSettingsStep />
      </Provider>,
    )

    expect(screen.getByLabelText("Chain ID")).toBeInTheDocument()
    expect(screen.getByLabelText("Kwil Version")).toBeInTheDocument()
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument()
  })

  it("allows input of network settings", () => {
    render(
      <Provider store={store}>
        <NetworkSettingsStep />
      </Provider>,
    )

    const chainIdInput: HTMLInputElement = screen.getByLabelText("Chain ID")
    console.log(chainIdInput)
    fireEvent.change(chainIdInput, { target: { value: "test-chain-id" } })
    expect(chainIdInput.value).toBe("test-chain-id")

    const kwilVersionSelect: HTMLSelectElement =
      screen.getByLabelText("Kwil Version")
    fireEvent.change(kwilVersionSelect, { target: { value: kwilVersion } })
    expect(kwilVersionSelect.value).toBe(kwilVersion)

    const companyNameInput: HTMLInputElement =
      screen.getByLabelText("Company Name")
    fireEvent.change(companyNameInput, { target: { value: "New Company" } })
    expect(companyNameInput.value).toBe("New Company")
  })
})
