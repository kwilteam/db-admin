import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { NetworkStep } from "@/components/Firebird/Deployments/NewDeployment/Step/Network"
import { Network } from "@/store/firebird"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

describe("NetworkStep", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        network: Network.testnet,
      },
    },
  })

  it("renders network options", () => {
    render(
      <Provider store={store}>
        <NetworkStep />
      </Provider>,
    )

    expect(screen.getByTestId("testnet-option")).toBeInTheDocument()
    expect(screen.getByTestId("mainnet-option")).toBeInTheDocument()
  })

  it("allows selection of network", () => {
    render(
      <Provider store={store}>
        <NetworkStep />
      </Provider>,
    )
    const mainnetOption = screen.getByText("Mainnet")
    fireEvent.click(mainnetOption)

    expect(store.getState().firebird.newDeployment?.network).toBe(
      Network.mainnet,
    )
  })
})
