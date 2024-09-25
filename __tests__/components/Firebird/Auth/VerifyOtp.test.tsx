import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import VerifyOtp from "@/components/Firebird/Auth/VerifyOtp"
import { mockStore } from "@/__tests__/mocks/mock-store"

// ... existing mocks ...

describe("VerifyOtp", () => {
  const store = mockStore({
    firebird: {
      authEmail: "test@example.com",
    },
  })

  it("renders the VerifyOtp component", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <VerifyOtp />
        </Provider>,
      )
    })

    expect(screen.getByTestId("access-code-header")).toBeInTheDocument()
    expect(screen.getByTestId("access-code-form")).toBeInTheDocument()
    expect(screen.getByTestId("access-code-status")).toBeInTheDocument()
  })

  it("allows input of access code", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <VerifyOtp />
        </Provider>,
      )
    })

    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(6)

    await act(async () => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: index.toString() } })
      })
    })

    inputs.forEach((input, index) => {
      expect(input).toHaveValue(index.toString())
    })
  })
})
