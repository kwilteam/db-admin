export const validateEmailAddress = (emailAddress: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(emailAddress)
}

export const validateEthAddress = (ethAddress: string): boolean => {
  return /^(0x)?[0-9a-fA-F]{40}$/i.test(ethAddress)
}
