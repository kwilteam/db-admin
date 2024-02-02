import { useEffect, useState } from "react"
import { selectDatabases, setDatabases } from "@/store/database"
import { setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useKwilProvider } from "../kwil/useKwilProvider"

export default function useDatabases() {
  const dispatch = useAppDispatch()
  const { readOnlyKwilProvider } = useKwilProvider()
  const databases = useAppSelector(selectDatabases)
  const [count, setCount] = useState<number | undefined>()

  useEffect(() => {
    if (!readOnlyKwilProvider) return

    const fetchDatabases = async () => {
      try {
        // TODO: If show only mine then include the current account address as a param
        const databasesResponse = await readOnlyKwilProvider.listDatabases()
        const _databases = databasesResponse?.data

        if (
          databasesResponse === undefined ||
          _databases === undefined ||
          _databases.length === 0
        ) {
          setCount(0)
          dispatch(setDatabases([]))
          return
        }

        // Strip owner from database as Uint8Array cannot be serialized in redux
        const databasesWithoutOwner = _databases.map((database) => {
          const { owner, ...rest } = database
          return rest
        })

        // const databases = _databases.map((database) => {
        //   const ownerString = new TextDecoder().decode(database.owner)
        //   database.owner = ownerString
        //   return database
        // })

        console.log("databases", databasesWithoutOwner)

        setCount(_databases.length)
        dispatch(setDatabases(databasesWithoutOwner))
      } catch (error) {
        dispatch(
          setAlert(
            {
              type: "error",
              text: "Failed to connect to Kwil Provider",
              position: "top",
            },
            false,
          ),
        )

        console.error(error)
      }
    }
    fetchDatabases()
  }, [dispatch, readOnlyKwilProvider])

  return { databases, count }
}
