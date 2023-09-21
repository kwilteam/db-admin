import { KwilTypes, TxReceipt } from "@/utils/database-types"
import { getDatabaseId, getKwilInstance } from "./core"

export const getTableData = async (
  database: string,
  table: string,
): Promise<KwilTypes.GenericResponse<Object[]> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const query = buildQuery(table)

    const result = await kwil.selectQuery(dbId, query)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result
  } catch (error) {
    console.error(error)
  }
}

const buildQuery = (table: string): string => {
  // Will receive the pagination, sortyBy, filterBy, etc. from the frontend
  return `SELECT * FROM ${table}`
}
