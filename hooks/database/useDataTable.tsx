import { useEffect, useState } from "react"
import { selectDatabaseObject, selectTableQueryParams } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { useKwilProvider } from "../kwil/useKwilProvider"
import { buildQuery } from "@/utils/build-query"

interface IDataTableProps {
  dbid: string
  table: string
}

export default function useDataTable({ dbid, table }: IDataTableProps) {
  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [columns, setColumns] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const kwilProvider = useKwilProvider()
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, dbid, table),
  )
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  useEffect(() => {
    if (!dbid || !table || !kwilProvider || !databaseObject) return

    const fetchTableData = async () => {
      try {
        setIsLoading(true)

        const tableDataQuery = buildQuery(table, tableQueryParams)
        const dbid = databaseObject?.dbid

        const queryResponse = await kwilProvider.selectQuery(
          dbid,
          tableDataQuery,
        )
        setTableData(queryResponse?.data)

        if (queryResponse.data && queryResponse.data?.length > 0) {
          const columns = Object.keys(queryResponse.data[0])
          setColumns(columns)
        }

        const tableCountQuery = `SELECT count(*) as count FROM ${table}`
        const response = await kwilProvider.selectQuery(dbid, tableCountQuery)

        const countData = response.data?.[0] as { count: number }

        setTotalCount(countData?.count)

        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTableData()
  }, [dbid, table, tableQueryParams, kwilProvider, databaseObject])

  return { tableData, totalCount, columns, isLoading }
}
