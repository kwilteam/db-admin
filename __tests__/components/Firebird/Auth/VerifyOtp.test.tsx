import { describe, expect, it, vi } from "vitest"
import { render, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../../../mocks/mock-store"
import AuthForm from "@/components/Firebird/Auth/AuthForm"
import * as mockOtps from "../../../mocks/mock-otps"
import * as firebirdApi from "@/utils/firebird/api"

// Mock the API module
vi.mock("@/utils/firebird/api", () => ({
  requestOtpAction: vi.fn(mockOtps.mockRequestOtpAction),
  verifyOtpAction: vi.fn(mockOtps.mockVerifyOtpAction),
}))

const mockEmail = "test@example.com"

describe("AuthForm", () => {
  it("should handle OTP request and verification", async () => {
    const store = mockStore({
      firebird: {
        authEmail: "",
        isAuthenticated: false,
      },
    })

    const { getByTestId } = render(
      <Provider store={store}>
        <AuthForm title="Test Auth" icon={null}>
          <div>Test Content</div>
        </AuthForm>
      </Provider>,
    )

    // Test OTP request
    fireEvent.change(getByTestId("email-input"), {
      target: { value: mockEmail },
    })
    fireEvent.click(getByTestId("continue-button"))

    // Wait for the OTP request to complete
    // await waitFor(() => {
    //   expect(firebirdApi.requestOtpAction).toHaveBeenCalledWith(mockEmail)
    // })

    // Get the mock OTP
    const mockOtp = mockOtps.getMockOtp(mockEmail)
    expect(mockOtp).toBeDefined()

    if (!mockOtp) {
      throw new Error("Mock OTP is undefined")
    }

    // Test OTP verification
    const otpInputs = getByTestId("otp-input").querySelectorAll("input")
    mockOtp.split("").forEach((digit, index) => {
      fireEvent.change(otpInputs[index], { target: { value: digit } })
    })

    // Wait for the OTP verification to complete
    await waitFor(() => {
      expect(firebirdApi.verifyOtpAction).toHaveBeenCalledWith(
        mockOtp,
        mockEmail,
      )
    })

    expect(getByTestId("success-message")).toBeInTheDocument()
  })
})
