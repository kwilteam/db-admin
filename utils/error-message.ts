export const getErrorMessage = (error: Error) => {
  let errorMessage = "An error occurred:"

  console.log("Error:", error)

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

  console.log(errorMessage)
  return errorMessage
}

export const getDetailsErrorMessage = (error: Error) => {
  let errorMessage = "An error occurred:"

  console.log("Error:", error)

  if (error instanceof Error) {
    try {
      const errorObj = JSON.parse(error.message)
      if (errorObj && errorObj.message) {
        errorMessage += ` ${errorObj.message}`
        // Check if details exist and are an array
        if (Array.isArray(errorObj.details) && errorObj.details.length > 0) {
          // Assuming we want to append the first detail's message
          const detailMessage = errorObj.details[0].message
          if (detailMessage) {
            errorMessage += ` - Detail: ${detailMessage}`
          }
        }
      }
    } catch (parseError) {
      // If parsing fails, use the original error message
      errorMessage += ` ${error.message}`
    }
  }

  console.log(errorMessage)
  return errorMessage
}
