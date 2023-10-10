"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setDatabaseActiveContext } from "@/store/database"
import useDataTable from "@/hooks/useDataTable"
import DataTable from "@/components/DatabaseItem/DataTable"
import Pagination from "@/components/DatabaseItem/Table/Pagination"
import Header from "@/components/DatabaseItem/Header"
import Filters from "@/components/DatabaseItem/Table/Filters"
import Sorting from "@/components/DatabaseItem/Table/Sorting"

interface IProps {
  params: {
    db: string
    table: string
  }
}

export default function DatabaseTablePage({ params }: IProps) {
  const { db: database, table } = params
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setDatabaseActiveContext({ database, type: "table", name: table }))
  }, [database, table, dispatch])

  const { tableData, totalCount, columns, isLoading } = useDataTable({
    database,
    table,
  })

  return (
    <div className="max-h-mobile min-h-mobile flex flex-col bg-white lg:min-h-screen">
      <Header database={database} type="table" name={table} />

      {columns && (
        <div className="justify-left flex w-full gap-1 border-b border-slate-200 bg-slate-50/50 p-1 text-center text-sm">
          <Filters database={database} table={table} columns={columns} />
          <Sorting database={database} table={table} columns={columns} />
        </div>
      )}

      <div className="flex-1 overflow-scroll bg-slate-50">
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
