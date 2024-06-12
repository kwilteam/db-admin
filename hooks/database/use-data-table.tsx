import { useEffect, useState } from "react"
import { selectDatabaseObject, selectDatabaseSchemas, selectTableQueryParams } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setAlert } from "@/store/global"
import { buildQuery } from "@/utils/build-query"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { getErrorMessage } from "@/utils/error-message"
import { IColumn, getColumnsFromSchema } from "@/utils/data-table"

interface IDataTableProps {
  dbid: string
  table: string
}

export default function useDataTable({ dbid, table }: IDataTableProps) {
  const dispatch = useAppDispatch()
  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [columns, setColumns] = useState<IColumn[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const kwilProvider = useKwilProvider()
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, dbid, table),
  )
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  const schemaDict = useAppSelector(selectDatabaseSchemas)
  const tables = schemaDict[dbid]?.tables

  useEffect(() => {
    if (!dbid || !table || !kwilProvider || !databaseObject || !tables) return
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
          const columnNames = Object.keys(queryResponse.data[0])
          setColumns(getColumnsFromSchema(
            columnNames,
            table,
            tables
          ))
        }

        const tableCountQuery = `SELECT count(*) as count FROM ${table}`
        const response = await kwilProvider.selectQuery(dbid, tableCountQuery)

        const countData = response.data?.[0] as { count: number }

        setTotalCount(countData?.count)

        setIsLoading(false)
      } catch (error) {
        const errorMessage = getErrorMessage(error as Error)

        dispatch(
          setAlert({
            type: "error",
            text: errorMessage || "An error occurred",
          }),
        )

        setIsLoading(false)
      }
    }

    fetchTableData()
  }, [dbid, table, tableQueryParams, kwilProvider, databaseObject, dispatch, tables])

  return { tableData, totalCount, columns, isLoading }
}
