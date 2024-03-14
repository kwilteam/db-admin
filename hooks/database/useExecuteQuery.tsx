import { useCallback } from "react"
import { getErrorMessage } from "@/utils/error-message"
import { useAppDispatch } from "@/store/hooks"
import { setAlert } from "@/store/global"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useExecuteQuery(dbid: string) {
  const dispatch = useAppDispatch()
  const kwilProvider = useKwilProvider()

  const executeQuery = useCallback(
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
        const errorMessage = getErrorMessage(error as Error)

        dispatch(
          setAlert({
            type: "error",
            text: errorMessage || "An error occurred",
          }),
        )
      }
    },
    [kwilProvider, dbid, dispatch],
  )

  return executeQuery
}
