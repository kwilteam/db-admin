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

// TODO => function that takes in a timestamp (string) and creates another timestamp +15 days
