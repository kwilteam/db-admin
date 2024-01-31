import { useParams } from "next/navigation"

interface IDatabaseParams {
  db?: string
  table?: string
  action?: string
}

export default function useDatabaseParams(): IDatabaseParams {
  const params: IDatabaseParams = useParams()

  const { db, table, action } = params

  return { db, table, action }
}
