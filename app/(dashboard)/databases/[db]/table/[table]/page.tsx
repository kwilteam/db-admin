"use client"

import { getTableData } from "@/utils/api"
import DataTable from "@/components/DatabaseItem/DataTable"
import Pagination from "@/components/DatabaseItem/Table/Pagination"
import Title from "@/components/DatabaseItem/Header"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import { selectTableQueryParams } from "@/store/database"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default function DatabaseTablePage({ params }: IProps) {
  const { db: database, table } = params
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )

  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true)
      const _response = await getTableData(database, table, tableQueryParams)
      setTableData(_response?.tableData)
      setTotalCount(_response?.totalCount)
      setIsLoading(false)
    }

    fetchTableData()
  }, [database, table, tableQueryParams])

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type="table" name={table} />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        {/* <Filters /> */}
        <DataTable data={tableData} type="table" isLoading={isLoading} />
      </div>
      <div className="flex">
        {!isLoading && (
          <Pagination
            database={database}
            table={table}
            totalCount={totalCount}
          />
        )}
      </div>
    </div>
  )
}
