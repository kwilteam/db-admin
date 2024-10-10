import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { MachinesStep } from "@/components/Firebird/Deployments/NewDeployment/Step/Machines"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { MachineType } from "@/utils/firebird/types"

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
        machines: MachineType.mini,
      },
    },
  })

  it("renders machine options", () => {
    render(
      <Provider store={store}>
        <MachinesStep />
      </Provider>,
    )

    const machineOptions = screen.getByTestId("machine-options")
    expect(machineOptions).toBeInTheDocument()

    const machineTypes = Object.values(MachineType)
    machineTypes.forEach((machineType) => {
      const option = screen.getByTestId(`machine-option-${machineType}`)
      expect(option).toBeInTheDocument()
    })
  })

  it("allows selection of a machine", () => {
    render(
      <Provider store={store}>
        <MachinesStep />
      </Provider>,
    )
    const miniOption = screen.getByTestId(`machine-option-${MachineType.mini}`)
    fireEvent.click(miniOption)
    expect(store.getState().firebird.newDeployment?.machines).toBe(
      MachineType.mini,
    )
  })
})
