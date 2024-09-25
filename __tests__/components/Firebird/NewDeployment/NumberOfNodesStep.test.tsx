import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { NumberOfNodesStep } from "@/components/Firebird/Deployments/NewDeployment/Step/NumberOfNodes"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

describe("NumberOfNodesStep", () => {
  const store = mockStore({
    firebird: {
      newDeployment: {
        nodeCount: 1,
      },
    },
  })

  it("renders number of nodes options", () => {
    render(
      <Provider store={store}>
        <NumberOfNodesStep />
      </Provider>,
    )

    expect(screen.getByTestId("step-3")).toBeInTheDocument()
    expect(screen.getByTestId("node-count")).toBeInTheDocument()
  })

  it("allows selection of number of nodes", () => {
    render(
      <Provider store={store}>
        <NumberOfNodesStep />
      </Provider>,
    )
    const nodeCountSelect = screen.getByTestId("node-count")
    fireEvent.change(nodeCountSelect, { target: { value: "3" } })
    expect(store.getState().firebird.newDeployment?.nodeCount).toBe(3)
  })
})
