"use client"

import DataTable from "@/components/DatabaseItem/DataTable"
import Pagination from "@/components/DatabaseItem/Table/Pagination"
import Title from "@/components/DatabaseItem/Header"
import Filters from "@/components/DatabaseItem/Table/Filters"
import Sorting from "@/components/DatabaseItem/Table/Sorting"
import useDataTable from "@/hooks/useDataTable"
import { useAppDispatch } from "@/store/hooks"
import { setDatabaseActiveContext } from "@/store/database"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default function DatabaseTablePage({ params }: IProps) {
  const { db: database, table } = params
  const dispatch = useAppDispatch()
  dispatch(setDatabaseActiveContext({ database, type: "table", name: table }))

  const { tableData, totalCount, columns, isLoading } = useDataTable({
    database,
    table,
  })

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type="table" name={table} />

      {columns && (
        <div className="justify-left flex w-full gap-2 border-b border-slate-200 bg-slate-50/50 p-1 text-center text-sm">
          <Filters columns={columns} />
          <Sorting columns={columns} />
        </div>
      )}

      <div className="flex-1 overflow-scroll bg-slate-50 lg:min-h-full">
        <DataTable
          columns={columns}
          data={tableData}
          type="table"
          isLoading={isLoading}
        />
      </div>

      {columns && (
        <div className="flex">
          <Pagination
            database={database}
            table={table}
            totalCount={totalCount}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
