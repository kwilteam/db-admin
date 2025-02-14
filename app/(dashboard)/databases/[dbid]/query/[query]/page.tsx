"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectDatabaseObject,
  setDatabaseActiveContext,
} from "@/store/database"
import { ItemType } from "@/utils/database-types"
import useQueryEditor from "@/hooks/database/use-query-editor"
import DataTable from "@/components/DatabaseItem/DataTable"
import Header from "@/components/DatabaseItem/Header"
import SaveQueryModal from "@/components/Modal/SaveQuery"
import QueryEditor from "@/components/DatabaseItem/Query/QueryEditor"
import Pagination from "@/components/DatabaseItem/Query/Pagination"
import { useTriggerProviderStatus } from "@/hooks/use-trigger-provider-status-check"

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
    paginationDisabled,
    loading,
    columns,
    queryData,
    totalCount,
    runQuery,
    triggerSaveQueryModal,
  } = useQueryEditor(dbid, queryName)

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ namespace: dbid, type, name: queryName }))
  }, [dbid, queryName, type, dispatch, databaseObject])

  // Ping Provider Status
  useTriggerProviderStatus({ delay: 500 })

  if (!databaseObject) return null

  return (
    <>
      <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
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
            totalCount={totalCount}
            type={type}
            isLoading={loading}
          />
        </div>

        {columns && !paginationDisabled && (
          <div className="flex">
            <Pagination
              dbid={dbid}
              queryName={queryName}
              totalCount={totalCount}
              isLoading={loading}
            />
          </div>
        )}
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
