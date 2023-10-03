import { useAppDispatch } from "@/store/hooks"
import { removeSchema } from "@/store/ide"
import { deleteSchema } from "@/utils/api"
import React from "react"

export default function useDeleteSchema() {
  const dispatch = useAppDispatch()

  const triggerDeleteSchema = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    schema: string,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    const c = confirm(`Are you sure you want to delete ${schema}.kf?`)

    if (c) {
      const deleted = await deleteSchema(schema)

      if (deleted) {
        dispatch(removeSchema(schema))
      }
    }
  }

  return triggerDeleteSchema
}
