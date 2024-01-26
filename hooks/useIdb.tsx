import { useState } from "react"
import { initIdb } from "@/utils/idb/init"
import { IDBPDatabase } from "idb"
import useMount from "./useMount"

export default function useIdb() {
  const [db, setDb] = useState<IDBPDatabase<unknown> | undefined>(undefined)

  useMount(() => {
    initIdb().then((db) => {
      setDb(db)
    })
  })

  return db
}
