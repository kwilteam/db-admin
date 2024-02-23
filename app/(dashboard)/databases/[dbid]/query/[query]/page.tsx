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
import QueryEditor from "@/components/DatabaseItem/Query/QueryEditor"
import useQueryEditor from "@/hooks/database/useQueryEditor"

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
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )
  const {
    isNewQuery,
    sql,
    setSql,
    loading,
    columns,
    queryData,
    runQuery,
    triggerSaveQueryModal,
  } = useQueryEditor(dbid, queryName)

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ dbid, type, name: queryName }))
  }, [dbid, queryName, type, dispatch, databaseObject])

  if (!databaseObject) return null

  return (
    <>
      <div className="flex  max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        <Header database={databaseObject.name} type={type} name={queryName} />

        <QueryEditor
          sql={sql}
          setSql={setSql}
          runQuery={runQuery}
          triggerSaveQueryModal={triggerSaveQueryModal}
        />

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
        isNewQuery={isNewQuery}
        queryName={queryName}
        sql={sql}
      />
    </>
  )
}
