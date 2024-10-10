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

const kwilVersion = "0.9.1"

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

    expect(screen.getByLabelText("Chain Id")).toBeInTheDocument()
    expect(screen.getByLabelText("Kwil Version")).toBeInTheDocument()
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument()
  })

  it("allows input of network settings", () => {
    render(
      <Provider store={store}>
        <NetworkSettingsStep />
      </Provider>,
    )

    const chainIdInput: HTMLInputElement = screen.getByLabelText("Chain Id")
    fireEvent.change(chainIdInput, { target: { value: "new-chain-id" } })
    expect(chainIdInput.value).toBe("new-chain-id")

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
