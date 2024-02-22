import { useCallback } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setAlert } from "@/store/global"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useExecuteTableQuery(dbid: string) {
  const dispatch = useAppDispatch()
  const kwilProvider = useKwilProvider()

  const executeTableQuery = useCallback(
    async (sql: string) => {
      if (!dbid || !sql || !kwilProvider) return

      try {
        const queryResponse = await kwilProvider.selectQuery(dbid, sql)
        const queryData = queryResponse?.data

        const columns =
          queryResponse.data && queryResponse.data?.length > 0
            ? Object.keys(queryResponse.data[0])
            : undefined

        return { queryData, columns }
      } catch (error) {
        const err = error as Error

        dispatch(
          setAlert({
            type: "error",
            text: "There was an error executing this query: " + err.message,
          }),
        )
        console.log(error)
      }
    },
    [kwilProvider, dbid, dispatch],
  )

  return executeTableQuery
}
