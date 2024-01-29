import { useCallback, useState } from "react"
import * as monaco from "monaco-editor"
import { compileSchema } from "@/utils/server-actions"
import { useAppDispatch } from "@/store/hooks"
import { addDatabase } from "@/store/database"
import { setAlert } from "@/store/global"
import { useKwilSigner } from "@/hooks/kwil/useKwilSigner"
import { useKwilProvider } from "@/hooks/kwil/useKwilProvider"

export default function useDeployDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isDeploying, setIsDeploying] = useState(false)
  const { writeKwilProvider } = useKwilProvider()
  const kwilSigner = useKwilSigner()

  const deploy = useCallback(async () => {
    if (!editorRef.current || !kwilSigner || !writeKwilProvider) return

    setIsDeploying(true)

    const schema = editorRef.current.getValue()

    try {
      // 1. Compile the code
      const compiledSchema = await compileSchema(schema)

      if (compiledSchema) {
        // 2. Sign compiled code using Kwil Browser Node
        console.log("Compiled Schema", compiledSchema)

        // 3. Deploy the signed code using Kwil Browser Node
        const deployBody = {
          schema: compiledSchema,
          description: "Deployed from Kwil Browser",
        }

        const res = await writeKwilProvider.deploy(deployBody, kwilSigner, true)

        console.log("Deployed Schema", res)

        const dbName = parseDbName(schema)

        dispatch(
          setAlert({
            type: "success",
            text: "Database deployed successfully!",
          }),
        )

        if (dbName) {
          dispatch(addDatabase(dbName))
        }
      }
    } catch (error) {
      const err = error as Error

      console.log("Deploy Error Msg", err.message)
      dispatch(
        setAlert({
          type: "error",
          text: `The database could not be deployed due to: ${err.message}`,
        }),
      )
    } finally {
      setIsDeploying(false)
    }
  }, [editorRef, dispatch, writeKwilProvider, kwilSigner])

  return { deploy, isDeploying }
}

const parseDbName = (code: string) => {
  const dbNameMatch = code.match(/database\s+(\w+);/)
  return dbNameMatch ? dbNameMatch[1] : undefined
}
