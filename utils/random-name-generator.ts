import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator"

export const generateRandomString = (type: "chain" | "company") => {
  let config: Config

  if (type === "chain") {
    config = {
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      length: 3,
    }
  } else {
    config = {
      dictionaries: [adjectives, colors],
      separator: " ",
      length: 2,
    }
  }

  return uniqueNamesGenerator(config)
}
