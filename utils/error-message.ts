export const getErrorMessage = (error: Error) => {
  let errorMessage = "An error occurred:"

  if (error instanceof Error) {
    // Assuming the error message is a JSON string
    try {
      const errorObj = JSON.parse(error.message)
      if (errorObj && errorObj.message) {
        errorMessage += ` ${errorObj.message}`
      }
    } catch (parseError) {
      // If parsing fails, use the original error message
      errorMessage += ` ${error.message}`
    }
  }

  return errorMessage
}

export const getDetailsErrorMessage = (error: Error) => {
  let errorMessage = "An error occurred:"

  if (error instanceof Error) {
    try {
      if (error.message.includes("user rejected action")) {
        errorMessage += " User rejected transaction"
      } else {
        const errorObj = JSON.parse(error.message)

        if (errorObj && errorObj.message) {
          errorMessage += ` ${errorObj.message}`
          // Check if details exist and are an array
          if (Array.isArray(errorObj.details) && errorObj.details.length > 0) {
            // Assuming we want to append the first detail's message
            const detailMessage = errorObj.details[0].message
            if (detailMessage) {
              errorMessage += ` - ${detailMessage}`
            }
          }
        }

        // sometimes (e.g., when sync is set to true) the error message is in the result object
        if (errorObj && !errorObj.message && errorObj.result.log) {
          errorMessage += ` ${errorObj.result.log}`
        }
      }
    } catch (parseError) {
      // If parsing fails, use the original error message
      errorMessage += ` ${error.message}`
    }
  }

  return errorMessage
}
