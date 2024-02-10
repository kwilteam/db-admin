import { useParams } from "next/navigation"

interface IDatabaseParams {
  dbid?: string
  table?: string
  action?: string
}

export default function useDatabaseParams(): IDatabaseParams {
  const params: IDatabaseParams = useParams()

  const { dbid, table, action } = params

  return { dbid, table, action }
}
