"use server"

export const requestOtpAction = async (email: string) => {
  console.log("Requesting OTP for email:", email)

  try {
    const url = `${process.env.FIREBIRD_API_URL}/api/otp`
    console.log("Firebird server URL:", url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    console.log("Response status:", response.status)

    if (response.ok) {
      return { success: true, message: "OTP request successful" }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || "Failed to request OTP",
      }
    }
  } catch (error) {
    console.error("Error requesting OTP:", error)
    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      return {
        success: false,
        message:
          "Unable to connect to the Firebird API. Please check your network connection and API URL.",
      }
    }
    return { success: false, message: "An unexpected error occurred" }
  }
}

export const verifyOtpAction = async (
  accessCode: string,
  email: string,
  context: "login" | "register",
) => {
  try {
    let url = `${process.env.FIREBIRD_API_URL}/api/`

    if (context === "login") {
      url += "signin"
    } else if (context === "register") {
      url += "signup"
    }

    console.log("Verifying OTP for email:", email, accessCode, context)
    console.log("Firebird server URL:", url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: accessCode, email }),
    })

    console.log("Response status:", response.status)

    if (response.ok) {
      const data = await response.json()

      console.log("RESPONSE DATA", data)
      return {
        success: true,
        message: "OTP verification successful",
        token: data.result.id, // TODO: should be renamed to data.token
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || "Failed to verify OTP",
        token: undefined,
      }
    }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      return {
        success: false,
        message:
          "Unable to connect to the Firebird API. Please check your network connection and API URL.",
        token: undefined,
      }
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      token: undefined,
    }
  }
}
