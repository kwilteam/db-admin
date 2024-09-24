import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { MachinesStep } from "@/components/Firebird/Deployments/NewDeployment/Step/Machines"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

describe("MachinesStep", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        machines: "mini",
      },
    },
  })

  it("renders machine options", () => {
    render(
      <Provider store={store}>
        <MachinesStep />
      </Provider>,
    )

    expect(screen.getByText("Select a Machine")).toBeInTheDocument()
    expect(screen.getByText("Mini")).toBeInTheDocument()
    expect(screen.getByText("Small")).toBeInTheDocument()
    expect(screen.getByText("Medium")).toBeInTheDocument()
    expect(screen.getByText("Large")).toBeInTheDocument()
  })

  it("allows selection of a machine", () => {
    render(
      <Provider store={store}>
        <MachinesStep />
      </Provider>,
    )
    const miniOption = screen.getByText("Mini")
    fireEvent.click(miniOption)
    expect(store.getState().firebird.newDeployment?.machines).toBe("mini")
  })
})
