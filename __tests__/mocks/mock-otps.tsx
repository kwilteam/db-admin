import { IFirebirdApiResponse } from "@/utils/firebird/types"

const mockOtps: { [email: string]: string } = {}

export const mockRequestOtpAction = async (
  email: string,
): Promise<IFirebirdApiResponse<string>> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString() // Generate a 6-digit OTP
  mockOtps[email] = otp
  return {
    status: 200,
    message: "OTP sent successfully",
  }
}

export const mockVerifyOtpAction = async (
  accessCode: string,
  email: string,
): Promise<IFirebirdApiResponse<string>> => {
  if (mockOtps[email] === accessCode) {
    return {
      status: 200,
      message: "OTP verified successfully",
    }
  } else {
    return {
      status: 400,
      message: "Invalid OTP",
    }
  }
}

export const getMockOtp = (email: string): string | undefined => {
  return mockOtps[email]
}
