"use client"

import Action from "@/components/DatabaseItem/Action"
import Title from "@/components/DatabaseItem/Header"
import {
  selectDatabaseObject,
  setDatabaseActiveContext,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ItemType } from "@/utils/database-types"
import { useEffect } from "react"
interface IProps {
  params: {
    dbid: string
    action: string
  }
}

export default function DatabaseActionPage({ params }: IProps) {
  const { dbid, action: name } = params
  const type = ItemType.ACTION
  const dispatch = useAppDispatch()

  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  useEffect(() => {
    if (!databaseObject) return

    dispatch(setDatabaseActiveContext({ dbid, type, name }))
  }, [dbid, name, type, dispatch, databaseObject])

  if (!databaseObject) return null

  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <Title database={databaseObject.name} type={type} name={name} />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        <Action dbid={databaseObject.dbid} actionName={name} />
      </div>
    </div>
  )
}
