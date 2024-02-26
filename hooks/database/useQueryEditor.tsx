import { useState, useEffect, useCallback } from "react"
import {
  saveQueryToStores,
  selectQuery,
  selectQueryPagination,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import useExecuteQuery from "./useExecuteQuery"
import { IPagination } from "@/utils/database-types"

export default function useQueryEditor(dbid: string, queryName: string) {
  const dispatch = useAppDispatch()
  const queryObject = useAppSelector((state) =>
    selectQuery(state, dbid, queryName),
  )
  const pagination = useAppSelector((state) =>
    selectQueryPagination(state, dbid, queryName),
  )

  const executeQuery = useExecuteQuery(dbid)
  const [sql, setSql] = useState<string>("")
  const [queryData, setQueryData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [isNewQuery, setIsNewQuery] = useState<boolean>(false)

  useEffect(() => {
    if (queryObject) {
      setSql(queryObject.sql)
    } else {
      setIsNewQuery(true)
    }
  }, [queryObject])

  const runQuery = useCallback(async () => {
    setLoading(true)

    // Append the pagination to the SQL query
    const cleanSql = sql.replace(/;/g, "")
    // TODO: This does not work but should check if the query already has a limit by clause
    const query = /limit by/i.test(cleanSql.toLowerCase())
      ? cleanSql
      : appendPagination(cleanSql, pagination)
    const response = await executeQuery(query)

    if (response) {
      setQueryData(response.queryData)
      setColumns(response.columns)

      // Get the total count of the query
      const countSql = `SELECT count(*) as count FROM (${cleanSql}) as subQuery`
      const countResponse = await executeQuery(countSql)
      const countData = countResponse?.queryData?.[0] as { count: number }

      setTotalCount(countData?.count)
    } else {
      setQueryData(undefined)
      setColumns(undefined)
    }
    setLoading(false)
  }, [sql, pagination, executeQuery])

  useEffect(() => {
    runQuery()
  }, [runQuery, pagination])

  const triggerSaveQueryModal = () => {
    if (!sql || sql.length === 0) return

    if (isNewQuery) {
      dispatch(setModal(ModalEnum.SAVE_QUERY))
    } else {
      dispatch(saveQueryToStores({ dbid, name: queryName, sql }))
      dispatch(setAlert({ type: "success", text: "Query saved" }))
    }
  }

  return {
    isNewQuery,
    sql,
    setSql,
    loading,
    columns,
    queryData,
    totalCount,
    runQuery,
    triggerSaveQueryModal,
  }
}

const appendPagination = (query: string, pagination: IPagination) => {
  if (pagination) {
    const { currentPage, perPage } = pagination

    query += ` LIMIT ${(currentPage - 1) * perPage},  ${perPage}`
  } else {
    query += ` LIMIT 0, 1`
  }

  return query
}
