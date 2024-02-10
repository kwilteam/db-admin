"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectDatabaseObject,
  setDatabaseActiveContext,
} from "@/store/database"
import useDataTable from "@/hooks/database/useDataTable"
import DataTable from "@/components/DatabaseItem/DataTable"
import Pagination from "@/components/DatabaseItem/Table/Pagination"
import Header from "@/components/DatabaseItem/Header"
import Filters from "@/components/DatabaseItem/Table/Filters"
import Sorting from "@/components/DatabaseItem/Table/Sorting"

interface IProps {
  params: {
    dbid: string
    table: string
  }
}

export default function DatabaseTablePage({ params }: IProps) {
  const { dbid, table } = params
  const dispatch = useAppDispatch()
  const { tableData, totalCount, columns, isLoading } = useDataTable({
    dbid,
    table,
  })
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ dbid, type: "table", name: table }))
  }, [dbid, table, dispatch, databaseObject])

  if (!databaseObject) return null

  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <Header database={databaseObject.name} type="table" name={table} />

      {columns && (
        <div className="justify-left flex w-full gap-1 border-b border-slate-200 bg-slate-50/50 p-1 text-center text-sm">
          <Filters dbid={databaseObject.dbid} table={table} columns={columns} />
          <Sorting dbid={databaseObject.dbid} table={table} columns={columns} />
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
            dbid={dbid}
            table={table}
            totalCount={totalCount}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
