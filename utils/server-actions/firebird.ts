"use server"

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email")
  console.log(email)

  //   const url = `${process.env.FIREBIRD_API_URL}/api/signin`
  //   console.log("Firebird server", url)

  //   const request = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({ email }),
  //   })

  // TODO: connect with Firebird API
  const requestStatus = 200

  if (requestStatus === 200) {
    return true
  }

  return false
}

export const registerAction = async (formData: FormData) => {
  const email = formData.get("email")
  console.log(email)

  // TODO: connect with Firebird API
  const requestStatus = 200

  if (requestStatus === 200) {
    return true
  }
}

export const verifyAccessCodeAction = async (formData: FormData) => {
  const accessCode = formData.get("accessCode")
  console.log(accessCode)

  // TODO: connect with Firebird API
  const requestStatus = 200

  if (requestStatus === 200) {
    return "access-code-XYZ"
  }

  return undefined
}
