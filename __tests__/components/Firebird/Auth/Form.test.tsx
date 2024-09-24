import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import AuthForm from "@/components/Firebird/Auth/AuthForm"
import { mockStore } from "@/__tests__/mocks/mock-store"
import { LoginIcon } from "@/utils/icons"

// Mock the Montserrat font
vi.mock("next/font/google", () => ({
  Montserrat: () => ({
    className: "mocked-montserrat",
  }),
}))

describe("AuthForm", () => {
  const store = mockStore({
    firebird: {
      authEmail: "",
    },
  })

  it("renders AuthForm with title and icon", () => {
    render(
      <Provider store={store}>
        <AuthForm
          title="Log in to your account"
          icon={<LoginIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />}
        >
          <div>Don&apos;t have an account?</div>
        </AuthForm>
      </Provider>,
    )

    expect(screen.getByText("Log in to your account")).toBeInTheDocument()
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
  })

  it("allows email input and form submission", async () => {
    render(
      <Provider store={store}>
        <AuthForm
          title="Log in to your account"
          icon={<LoginIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />}
        >
          <div>Don&apos;t have an account?</div>
        </AuthForm>
      </Provider>,
    )

    const emailValue = "test@example.com"

    const emailInput = screen.getByTestId("email-input")
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: emailValue } })
    })
    expect(emailInput).toHaveValue(emailValue)

    const continueButton = screen.getByTestId("continue-button")
    await act(async () => {
      fireEvent.click(continueButton)
    })

    expect(store.getState().firebird.authEmail).toBe(emailValue)
  })
})
