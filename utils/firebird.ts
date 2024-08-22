// Helper function to handle API requests
const firebirdApiRequest = async (
  endpoint: string,
  method: "POST" | "GET" = "GET",
  body?: object,
) => {
  const apiUrl = process.env.NEXT_PUBLIC_FIREBIRD_API_URL
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_FIREBIRD_API_URL is not set")
    return { success: false, message: "API URL is not configured properly" }
  }

  const url = `${apiUrl}/api/${endpoint}`
  console.log(`${method} request to:`, url)

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    })

    console.log("Response status:", response.status)

    if (response.ok) {
      const data = await response.json()
      return { status: 200, message: "Request successful", data }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        status: response.status,
        message: errorData.message || `Failed to ${endpoint}`,
      }
    }
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error)
    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      return {
        status: 500,
        message:
          "Unable to connect to the Firebird API. Please check your network connection and API URL.",
      }
    }
    return { status: 500, message: "An unexpected error occurred" }
  }
}

export const requestOtpAction = async (email: string) => {
  console.log("Requesting OTP for email:", email)
  return firebirdApiRequest("auth/send-otp", "POST", { email })
}

export const verifyOtpAction = async (accessCode: string, email: string) => {
  console.log("Verifying OTP for email:", email, accessCode)
  return firebirdApiRequest("auth/verify-otp", "POST", {
    otp: accessCode,
    email,
  })
}

export const signOut = async () => {
  console.log("Signing out")
  return await firebirdApiRequest("auth/signout")
}

export const getDeployments = async () => {
  console.log("Getting deployments")
  return await firebirdApiRequest("deployments")
}

export const getAccount = async () => {
  console.log("Getting account")
  return await firebirdApiRequest("account")
}
