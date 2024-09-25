import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import VerifyOtp from "@/components/Firebird/Auth/VerifyOtp"
import { mockStore } from "@/__tests__/mocks/mock-store"

// Mock the next/navigation module
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the next/image component
vi.mock("next/image", () => ({
  default: () => <img alt="Kwil" />, // eslint-disable-line
}))

describe("VerifyOtp", () => {
  const store = mockStore({
    firebird: {
      authEmail: "test@example.com",
    },
  })

  it("renders the VerifyOtp component", () => {
    render(
      <Provider store={store}>
        <VerifyOtp />
      </Provider>,
    )

    expect(screen.getByTestId("access-code-header")).toBeInTheDocument()
    expect(screen.getByTestId("access-code-form")).toBeInTheDocument()
    expect(screen.getByTestId("access-code-status")).toBeInTheDocument()
  })

  it("allows input of access code", () => {
    render(
      <Provider store={store}>
        <VerifyOtp />
      </Provider>,
    )

    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(6)

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: index.toString() } })
      expect(input).toHaveValue(index.toString())
    })
  })
})
