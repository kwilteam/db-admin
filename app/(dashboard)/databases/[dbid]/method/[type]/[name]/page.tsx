"use client"

import Method from "@/components/DatabaseItem/Method"
import Title from "@/components/DatabaseItem/Header"
import {
  selectDatabaseObject,
  setDatabaseActiveContext,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ItemType } from "@/utils/database-types"
import { useEffect } from "react"
import { useTriggerProviderStatus } from "@/hooks/use-trigger-provider-status-check"
interface IProps {
  params: {
    type: ItemType
    dbid: string
    name: string
  }
}

export default function DatabaseActionPage({ params }: IProps) {
  const { dbid, type, name } = params
  const dispatch = useAppDispatch()

  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ dbid, type, name }))
  }, [dbid, name, type, dispatch, databaseObject])

  // Ping Provider Status
  useTriggerProviderStatus({ delay: 500 })

  if (!databaseObject) return null

  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <Title database={databaseObject.name} type={type} name={name} />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        <Method dbid={databaseObject.dbid} methodName={name} type={type} />
      </div>
    </div>
  )
}
