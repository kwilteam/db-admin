import { useState, useEffect, useCallback, useRef } from "react"
import { IPagination } from "@/utils/database-types"
import {
  saveQueryToStores,
  selectQuery,
  selectQueryPagination,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import useExecuteQuery from "./use-execute-query"
import { IColumn } from "@/utils/data-table"
import useExecuteTx from "./use-execute-tx"

export default function useQueryEditor(namespace: string, queryName: string) {
  const dispatch = useAppDispatch()
  const queryObject = useAppSelector((state) =>
    selectQuery(state, namespace, queryName),
  )
  const pagination = useAppSelector((state) =>
    selectQueryPagination(state, namespace, queryName),
  )

  const paginationRef = useRef(pagination)
  const [paginationDisabled, setPaginationDisabled] = useState<boolean>(false)
  const executeQuery = useExecuteQuery(namespace)
  const executeTx = useExecuteTx(namespace)
  const [sql, setSql] = useState<string>("")
  const [queryData, setQueryData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<IColumn[] | undefined>(undefined)
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [isNewQuery, setIsNewQuery] = useState<boolean>(false)

  useEffect(() => {
    if (queryObject) {
      setSql(queryObject.sql)
      runQuery(queryObject.sql)
    } else {
      setIsNewQuery(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryObject]) // We only want to render this onload of the queryObject from the store

  const appendPagination = useCallback(
    (sql: string, pagination: IPagination) => {
      if (!sql || sql.length === 0) return undefined

      // We don't want to append pagination if it's not active
      if (pagination && paginationDisabled) return sql

      if (pagination) {
        const { currentPage, perPage } = pagination

        sql += ` LIMIT ${perPage} OFFSET ${(currentPage - 1) * perPage}`
      } else {
        sql += ` LIMIT 50 OFFSET 0`
      }

      return sql
    },
    [paginationDisabled],
  )

  const runQuery = useCallback(
    async (sqlString: string) => {
      setLoading(true)

      // Remove ; from SQL
      let cleanSql = sqlString.replace(/;/g, "")
      let response

      // Check if the query already has a limit, if not add pagination
      if (/limit /i.test(cleanSql.toLowerCase())) {
        setPaginationDisabled(true)
        response = await executeQuery(cleanSql)
      } else {
        setPaginationDisabled(false)
        const paginatedSql = appendPagination(cleanSql, pagination)
        if (paginatedSql) {
          response = await executeQuery(paginatedSql)
        }
      }

      if (response) {
        setQueryData(response.queryData)
        setColumns(response.columns?.map(c => ({ name: c })));

        // Get the total count of the query
        const countSql = `{${namespace}}SELECT count(*) as count FROM (${cleanSql}) as subQuery`
        const countResponse = await executeQuery(countSql)
        const countData = countResponse?.queryData?.[0] as { count: number }

        setTotalCount(countData?.count)
      } else {
        setQueryData(undefined)
        setColumns(undefined)
        setTotalCount(undefined)
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
      dispatch(saveQueryToStores({ dbid: namespace, name: queryName, sql }))
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
    executeTx
  }
}
