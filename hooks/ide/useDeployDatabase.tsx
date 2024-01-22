import { useState, useEffect } from "react"
import * as monaco from "monaco-editor"
import { deployDatabase } from "@/utils/api"
import { useAppDispatch } from "@/store/hooks"
import { addDatabase } from "@/store/database"
import { setAlert } from "@/store/global"

export default function useDeployDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isDeploying, setIsDeploying] = useState(false)

  const deploy = async () => {
    if (!editorRef.current) return

    setIsDeploying(true)

    const code = editorRef.current.getValue()
    try {
      const result = await deployDatabase(code)
      const dbName = getDbName(code)

      if (result && result.outcome === "success") {
        dispatch(
          setAlert({
            type: "success",
            text: "Database deployed successfully!",
            position: "top",
          }),
        )
        if (dbName) {
          dispatch(addDatabase(dbName))
        }
      } else if (result && result.outcome === "error") {
        dispatch(
          setAlert({
            type: "error",
            text: result.data as string,
            position: "top",
          }),
        )
      }
    } catch (error) {
      const err = error as Error

      dispatch(
        setAlert({
          type: "error",
          text: `The database could not be deployed due to: ${err.message}`,
          position: "top",
        }),
      )
    } finally {
      setIsDeploying(false)
    }
  }

  useEffect(() => {
    return () => {
      setIsDeploying(false)
    }
  }, [])

  return { deploy, isDeploying }
}

const getDbName = (code: string) => {
  const dbNameMatch = code.match(/database\s+(\w+);/)
  return dbNameMatch ? dbNameMatch[1] : undefined
}
