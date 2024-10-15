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
  const millisecondsInADay = 86400000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  
  // Add the specified number of days
  date.setTime(date.getTime() + days * millisecondsInADay);
  
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  }).format(date);
}

export const add15DaysToTimestamp = (timestamp: number): string => {
  return addDaysToTimestamp(timestamp, 15);
}
