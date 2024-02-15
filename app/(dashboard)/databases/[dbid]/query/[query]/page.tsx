"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import {
  saveQueryToStores,
  selectDatabaseObject,
  selectQuery,
  setDatabaseActiveContext,
} from "@/store/database"
import DataTable from "@/components/DatabaseItem/DataTable"
import Header from "@/components/DatabaseItem/Header"
import useExecuteTableQuery from "@/hooks/database/useExecuteTableQuery"
import Button from "@/components/Button"
import SaveQueryModal from "@/components/Modal/SaveQuery"
import { ItemType } from "@/utils/database-types"

interface IProps {
  params: {
    dbid: string
    query: string
  }
}

export default function DatabaseQueryPage({ params }: IProps) {
  const { dbid, query: queryName } = params
  const type = ItemType.QUERY
  const dispatch = useAppDispatch()
  const executeTableQuery = useExecuteTableQuery(dbid)
  const [sql, setSql] = useState<string>("")
  const [queryData, setQueryData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [isNewQuery, setIsNewQuery] = useState<boolean>(false)
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )
  const queryObject = useAppSelector((state) =>
    selectQuery(state, dbid, queryName),
  )

  useEffect(() => {
    if (queryObject) {
      setSql(queryObject.sql)
    } else {
      setIsNewQuery(true)
    }
  }, [queryObject])

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ dbid, type, name: queryName }))
  }, [dbid, queryName, type, dispatch, databaseObject])

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

  const triggerSaveQueryModal = () => {
    if (!sql || sql.length === 0) return

    if (isNewQuery) {
      dispatch(setModal(ModalEnum.SAVE_QUERY))
    } else {
      dispatch(saveQueryToStores({ dbid, name: queryName, sql }))
      dispatch(setAlert({ type: "success", text: "Query saved" }))
    }
  }

  if (!databaseObject) return null

  return (
    <>
      <div className="flex  max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        <Header database={databaseObject.name} type={type} name={queryName} />

        <div className="flex h-40 flex-col gap-2 overflow-scroll bg-slate-50 p-2">
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="h-36 w-full flex-1 p-2 text-sm"
            placeholder="Enter SQL query"
          />
          <div className="flex flex-row gap-2">
            <Button onClick={triggerSaveQueryModal} context="secondary">
              Save
            </Button>

            <Button onClick={runQuery} context="primary">
              Execute
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-scroll bg-slate-50">
          <DataTable
            columns={columns}
            data={queryData}
            type={type}
            isLoading={loading}
          />
        </div>
      </div>

      <SaveQueryModal
        dbid={dbid}
        queryName={queryName}
        sql={sql}
        isNewQuery={isNewQuery}
      />
    </>
  )
}
