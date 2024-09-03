import {
  IFirebirdApiAccountResponse,
  IFirebirdDeployment,
  IFirebirdDeploymentConfig,
  IFirebirdApiDeploymentsResponse,
  IFirebirdApiDeployResponse,
  IFirebirdApiResponse,
  IFirebirdApiVerifyOtpResponse,
  IFirebirdApiNode,
  IFirebirdApiService,
} from "./types"

// Helper function to handle API requests
const firebirdApiRequest = async <T>(
  endpoint: string,
  method: "POST" | "GET" | "DELETE" = "GET",
  body?: object,
): Promise<IFirebirdApiResponse<T>> => {
  const apiUrl = process.env.NEXT_PUBLIC_FIREBIRD_API_URL
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_FIREBIRD_API_URL is not set")
    return { status: 400, message: "API URL is not configured properly" }
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
  return firebirdApiRequest<IFirebirdApiVerifyOtpResponse>(
    "auth/verify-otp",
    "POST",
    {
      otp: accessCode,
      email,
    },
  )
}

export const getAccount = async () => {
  console.log("Getting account")
  return await firebirdApiRequest<IFirebirdApiAccountResponse>("account")
}

export const signOut = async () => {
  console.log("Signing out")
  return await firebirdApiRequest("auth/signout")
}

export const deployNetwork = async (data: IFirebirdDeploymentConfig) => {
  console.log("Deploying network", data)
  return await firebirdApiRequest<IFirebirdApiDeployResponse>(
    "deployments",
    "POST",
    data,
  )
}

export const getDeployments = async () => {
  console.log("Getting deployments")
  return await firebirdApiRequest<IFirebirdApiDeploymentsResponse>(
    "deployments",
  )
}

export const getDeployment = async (deploymentId: string) => {
  console.log("Getting deployment", deploymentId)
  return await firebirdApiRequest<IFirebirdDeployment>(
    `deployments/${deploymentId}`,
  )
}

export const getNodes = async (deploymentId: string) => {
  console.log("Getting nodes", deploymentId)
  return await firebirdApiRequest<IFirebirdApiNode[]>(
    `deployments/${deploymentId}/nodes`,
  )
}

export const getDeploymentServices = async (deploymentId: string) => {
  console.log("Getting deployment services", deploymentId)
  return await firebirdApiRequest<IFirebirdApiService[]>(
    `deployments/${deploymentId}/services`,
  )
}

export const getNodeServices = async (nodeId: string) => {
  console.log("Getting node services", nodeId)
  return await firebirdApiRequest<IFirebirdApiService[]>(
    `nodes/${nodeId}/services`,
  )
}

export const deleteDeployment = async (deploymentId: string) => {
  console.log("Deleting deployment", deploymentId)
  return await firebirdApiRequest(`deployments/${deploymentId}`, "DELETE")
}
