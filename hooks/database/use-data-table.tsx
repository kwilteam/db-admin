import { useEffect, useState } from "react"
import { selectDatabaseObject, selectDatabaseSchemas, selectTableQueryParams } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setAlert } from "@/store/global"
import { buildQuery } from "@/utils/build-query"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { getErrorMessage } from "@/utils/error-message"
import { IColumn } from "@/utils/data-table"
import { IColumnInfo } from "@/utils/database-types"

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
  const namespaceObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  const schemaDict = useAppSelector(selectDatabaseSchemas)
  const tables = schemaDict[dbid]?.tables

  useEffect(() => {
    if (!dbid || !table || !kwilProvider || !namespaceObject || !tables) return
    const fetchTableData = async () => {
      try {
        setIsLoading(true)

        const tableDataQuery = buildQuery(table, tableQueryParams)
        const namespace = namespaceObject?.name
        const queryString = `{${namespace}}${tableDataQuery}`

        const queryResponse = await kwilProvider.selectQuery(
          queryString
        )
        setTableData(queryResponse?.data)

        const columnInfo = await kwilProvider.selectQuery<IColumnInfo>(
          'SELECT name, data_type FROM info.columns WHERE namespace = $n AND table_name = $t',
          {
            $n: namespace,
            $t: table
          }
        )

        if (columnInfo.data === undefined) {
          throw new Error(
            `Could not get columns for table ${table}. Response: ${JSON.stringify(
              columnInfo,
            )}`,
          )
        }

        if (columnInfo.data && columnInfo.data?.length > 0) {
          const columns: IColumn[] = columnInfo.data.map((c) => {
            return {
              name: c.name,
              dataType: c.data_type,
            }
          });

          setColumns(columns)
        };

        const tableCountQuery = `{${namespace}}SELECT count(*) as count FROM ${table}`
        const response = await kwilProvider.selectQuery(tableCountQuery)

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
  }, [dbid, table, tableQueryParams, kwilProvider, namespaceObject, dispatch, tables])

  return { tableData, totalCount, columns, isLoading }
}
