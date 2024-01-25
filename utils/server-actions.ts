"use server"

import { type KuneiformObject, NodeParser } from "kuneiform-parser"

export async function compileSchema(
  schema: string,
): Promise<KuneiformObject | undefined> {
  // 1. Convert string to object using
  const parser = await NodeParser.load()

  const kuneiformSchema = await parser.parse(schema)

  if (!kuneiformSchema.json) {
    // TODO: Instead the error should be thrown in the parser

    throw new Error(
      // @ts-ignore
      kuneiformSchema.error || "Failed to parse database definition",
    )
  }

  return JSON.parse(kuneiformSchema.json) as KuneiformObject
}
