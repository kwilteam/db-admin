"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  saveQueryToStores,
  selectDatabaseObject,
  setDatabaseActiveContext,
} from "@/store/database"
import DataTable from "@/components/DatabaseItem/DataTable"
import Header from "@/components/DatabaseItem/Header"
import useExecuteTableQuery from "@/hooks/database/useExecuteTableQuery"
import Button from "@/components/Button"

interface IProps {
  params: {
    dbid: string
    query: string
  }
}

export default function DatabaseQueryPage({ params }: IProps) {
  const { dbid, query } = params
  const dispatch = useAppDispatch()
  const executeTableQuery = useExecuteTableQuery(dbid)
  const [sql, setSql] = useState<string>("")
  const [queryData, setQueryData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  // useEffect(() => {
  //   if (!databaseObject) return

  //   dispatch(setDatabaseActiveContext({ dbid, type: "table", name: table }))
  // }, [dbid, table, dispatch, databaseObject])

  const runQuery = async () => {
    setLoading(true)
    const response = await executeTableQuery(sql)
    if (response) {
      setQueryData(response.queryData)
      setColumns(response.columns)
    } else {
      setQueryData(undefined)
      setColumns(undefined)
    }
    setLoading(false)
  }

  const saveQuery = () => {
    dispatch(saveQueryToStores({ dbid, name: "testing", sql }))
  }

  if (!databaseObject) return null

  return (
    <div className="flex  max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <Header database={databaseObject.name} type="query" name={query} />

      <div className="flex h-40 flex-col gap-2 overflow-scroll bg-slate-50 p-2">
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          className="h-36 w-full flex-1 p-2 text-sm"
          placeholder="Enter SQL query"
        />
        <div className="flex flex-row gap-2">
          <Button onClick={runQuery} context="primary">
            Execute
          </Button>

          <Button onClick={saveQuery} context="secondary">
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-scroll bg-slate-50">
        <DataTable
          columns={columns}
          data={queryData}
          type="query"
          isLoading={loading}
        />
      </div>
    </div>
  )
}
