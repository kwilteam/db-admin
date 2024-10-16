export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // Convert  milliseconds
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  }).format(date)
}

export const capitalize = (s: string) => {
  if (!s) return ""
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const addDaysToTimestamp = (timestamp: number, days: number): string => {
  const millisecondsInADay = 86400000 // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const date = new Date(timestamp * 1000) // Convert to milliseconds

  // Add the specified number of days
  date.setTime(date.getTime() + days * millisecondsInADay)

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  }).format(date)
}

export const add15DaysToTimestamp = (timestamp: number): string => {
  return addDaysToTimestamp(timestamp, 15)
}

export const isLessThan24HoursAgo = (
  accountCreationDate: number | undefined,
): boolean | undefined => {
  if (accountCreationDate) {
    // convert from seconds to milliseconds
    const createdDateInMilliseconds = accountCreationDate * 1000

    // Get the current time in milliseconds
    const currentTimeInMilliseconds = Date.now()

    // Difference in time between now and accountCreationDate
    const timeDifference = currentTimeInMilliseconds - createdDateInMilliseconds

    // 24 hours in milliseconds
    const hours24InMilliseconds = 24 * 60 * 60 * 1000

    return timeDifference < hours24InMilliseconds
  }
  return undefined
}
