import { useAppDispatch } from "@/store/hooks"
import { removeSchema } from "@/store/ide"
import { deleteSchema } from "@/utils/idb/ide"
import React, { useCallback } from "react"
import useIdb from "../useIdb"
import { setAlert } from "@/store/global"

export default function useDeleteSchema() {
  const dispatch = useAppDispatch()
  const db = useIdb()

  const triggerDeleteSchema = useCallback(
    async (
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      schema: string,
    ) => {
      try {
        e.stopPropagation() // To prevent triggering openSchema
        if (!db) return

        const c = confirm(`Are you sure you want to delete ${schema}.kf?`)

        if (c) {
          await deleteSchema(db, schema)

          dispatch(removeSchema(schema))
        }
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            text: "Failed to delete schema due to an unexpected error. Please try again.",
          }),
        )
      } finally {
        return
      }
    },
    [dispatch, db],
  )

  return triggerDeleteSchema
}
