import { useEffect, useState } from "react"
import { selectTableQueryParams } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { getTableData } from "@/utils/api"

interface IDataTableProps {
  database: string
  table: string
}

export default function useDataTable({ database, table }: IDataTableProps) {
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )

  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [columns, setColumns] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsLoading(true)
        const response = await getTableData(database, table, tableQueryParams)
        setTableData(response?.tableData)
        setTotalCount(response?.totalCount)

        if (response && response.tableData?.length > 0) {
          const columns = Object.keys(response.tableData[0])
          setColumns(columns)
        }

        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTableData()
  }, [database, table, tableQueryParams])

  return { tableData, totalCount, columns, isLoading }
}
