import { MethodTypes } from "@/utils/database-types"
import { useParams } from "next/navigation"

interface IDatabaseParams {
  dbid?: string
  table?: string
  name?: string
  type?: MethodTypes
  query?: string
}

export default function useDatabaseParams(): IDatabaseParams {
  const params: IDatabaseParams = useParams() || {}

  const { dbid, table, name, type, query } = params

  return { dbid, table, name, type, query }
}
