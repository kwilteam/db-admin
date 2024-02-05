import { useEffect, useState } from "react"
import { selectDatabaseObject, selectTableQueryParams } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { useKwilProvider } from "../kwil/useKwilProvider"
import { buildQuery } from "@/utils/build-query"

interface IDataTableProps {
  database: string
  table: string
}

export default function useDataTable({ database, table }: IDataTableProps) {
  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [columns, setColumns] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { readOnlyKwilProvider } = useKwilProvider()
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, database),
  )

  useEffect(() => {
    if (!database || !table || !readOnlyKwilProvider || !databaseObject) return

    const fetchTableData = async () => {
      try {
        setIsLoading(true)

        const tableDataQuery = buildQuery(table, tableQueryParams)
        const dbid = databaseObject?.dbid

        const queryResponse = await readOnlyKwilProvider.selectQuery(
          dbid,
          tableDataQuery,
        )
        setTableData(queryResponse?.data)

        if (queryResponse.data && queryResponse.data?.length > 0) {
          const columns = Object.keys(queryResponse.data[0])
          setColumns(columns)
        }

        const tableCountQuery = `SELECT count(*) as count FROM ${table}`
        const response = await readOnlyKwilProvider.selectQuery(
          dbid,
          tableCountQuery,
        )

        const countData = response.data?.[0] as { count: number }

        setTotalCount(countData?.count)

        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTableData()
  }, [database, table, tableQueryParams, readOnlyKwilProvider, databaseObject])

  return { tableData, totalCount, columns, isLoading }
}
