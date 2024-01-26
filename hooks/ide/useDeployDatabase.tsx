import { useState, useEffect } from "react"
import * as monaco from "monaco-editor"
import { compileSchema } from "@/utils/server-actions"
import { useAppDispatch } from "@/store/hooks"
import { addDatabase } from "@/store/database"
import { setAlert } from "@/store/global"
import { getKwilProvider, getKwilSigner } from "@/utils/kwil/client"

export default function useDeployDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isDeploying, setIsDeploying] = useState(false)

  // const deploy = async () => {
  //   if (!editorRef.current) return

  //   setIsDeploying(true)

  //   const code = editorRef.current.getValue()
  //   try {
  //     const result = await deployDatabase(code)
  //     const dbName = getDbName(code)

  //     if (result && result.outcome === "success") {
  //       dispatch(
  //         setAlert({
  //           type: "success",
  //           text: "Database deployed successfully!",
  //           position: "top",
  //         }),
  //       )
  //       if (dbName) {
  //         dispatch(addDatabase(dbName))
  //       }
  //     } else if (result && result.outcome === "error") {
  //       dispatch(
  //         setAlert({
  //           type: "error",
  //           text: result.data as string,
  //           position: "top",
  //         }),
  //       )
  //     }
  //   } catch (error) {

  //     const err = error as Error
  //     dispatch(
  //       setAlert({
  //         type: "error",
  //         text: `The database could not be deployed due to: ${err.message}`,
  //         position: "top",
  //       }),
  //     )
  //   } finally {
  //     setIsDeploying(false)
  //   }
  // }

  const deploy = async () => {
    if (!editorRef.current) return

    setIsDeploying(true)

    const schema = editorRef.current.getValue()

    try {
      // 1. Compile the code
      const compiledSchema = await compileSchema(schema)

      if (compiledSchema) {
        // 2. Sign compiled code using Kwil Browser Node
        console.log("Compiled Schema", compiledSchema)

        // 3. Deploy the signed code using Kwil Browser Node
        const { writeKwilProvider } = await getKwilProvider()
        const kwilSigner = await getKwilSigner()

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
  }

  return { deploy, isDeploying }
}

const parseDbName = (code: string) => {
  const dbNameMatch = code.match(/database\s+(\w+);/)
  return dbNameMatch ? dbNameMatch[1] : undefined
}
