import { useState, useEffect, useCallback, useRef } from "react"
import { IPagination } from "@/utils/database-types"
import {
  saveQueryToStores,
  selectQuery,
  selectQueryPagination,
  setQueryPagination,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import useExecuteQuery from "./useExecuteQuery"

export default function useQueryEditor(dbid: string, queryName: string) {
  const dispatch = useAppDispatch()
  const queryObject = useAppSelector((state) =>
    selectQuery(state, dbid, queryName),
  )
  const pagination = useAppSelector((state) =>
    selectQueryPagination(state, dbid, queryName),
  )
  const paginationRef = useRef(pagination)
  const [paginationDisabled, setPaginationDisabled] = useState<boolean>(false)
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

  const appendPagination = useCallback(
    (sql: string, pagination: IPagination) => {
      // We don't want to append pagination if it's not active
      if (pagination && paginationDisabled) return sql

      if (pagination) {
        const { currentPage, perPage } = pagination

        sql += ` LIMIT ${(currentPage - 1) * perPage}, ${perPage}`
      } else {
        sql += ` LIMIT 0, 1`
      }

      return sql
    },
    [paginationDisabled],
  )

  const runQuery = useCallback(
    async (sql: string) => {
      setLoading(true)

      // Remove ; from SQL
      const cleanSql = sql.replace(/;/g, "")
      let response

      // Check if the query already has a limit, if not add pagination
      if (/limit /i.test(cleanSql.toLowerCase())) {
        setPaginationDisabled(true)
        console.log(cleanSql)
        response = await executeQuery(cleanSql)
      } else {
        setPaginationDisabled(false)
        const paginatedSql = appendPagination(cleanSql, pagination)
        console.log(paginatedSql)
        response = await executeQuery(paginatedSql)
      }

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
    },
    [executeQuery, appendPagination, pagination],
  )

  // Whenever the pagination changes we need to run the query again
  // But we don't want to run the query each time the sql changes
  useEffect(() => {
    // Compare the current pagination with the previous one
    // Only run the query if there's a change
    if (
      !paginationDisabled &&
      JSON.stringify(pagination) !== JSON.stringify(paginationRef.current)
    ) {
      runQuery(sql)
    }
    // Update the ref to the current pagination in any case
    paginationRef.current = pagination
  }, [sql, pagination, paginationDisabled, runQuery])

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
    paginationDisabled,
    loading,
    columns,
    queryData,
    totalCount,
    runQuery,
    triggerSaveQueryModal,
  }
}
