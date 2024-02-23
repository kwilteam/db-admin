import { useState, useEffect } from "react"
import { saveQueryToStores, selectQuery } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import useExecuteTableQuery from "./useExecuteTableQuery"

export default function useQueryEditor(dbid: string, queryName: string) {
  const dispatch = useAppDispatch()
  const queryObject = useAppSelector((state) =>
    selectQuery(state, dbid, queryName),
  )

  const executeTableQuery = useExecuteTableQuery(dbid)
  const [sql, setSql] = useState<string>("")
  const [queryData, setQueryData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [isNewQuery, setIsNewQuery] = useState<boolean>(false)

  useEffect(() => {
    if (queryObject) {
      setSql(queryObject.sql)
    } else {
      setIsNewQuery(true)
    }
  }, [queryObject])

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

  return {
    isNewQuery,
    sql,
    setSql,
    loading,
    columns,
    queryData,
    runQuery,
    triggerSaveQueryModal,
  }
}
