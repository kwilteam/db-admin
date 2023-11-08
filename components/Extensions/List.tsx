"use client"

import { useEffect } from "react"
import {
  IKwilExtension,
  selectExtensions,
  selectFilters,
  selectLoading,
  setExtensions,
  setLoading,
} from "@/store/extensions"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import ExtensionCard from "./Card"
import Loading from "../Loading"
import { getExtensions } from "@/utils/api"

export default function ExtensionList() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  const extensions = useAppSelector(selectExtensions)
  const filters = useAppSelector(selectFilters)

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        dispatch(setLoading(true))
        const _extensions = await getExtensions(filters)

        if (_extensions.outcome === "error") {
          dispatch(setLoading(false))
          alert("Error fetching extensions")
          return
        }

        dispatch(setExtensions(_extensions.data as IKwilExtension[]))
        dispatch(setLoading(false))
      } catch (error) {
        console.log(error)
      }
    }

    fetchExtensions()
  }, [dispatch, filters])

  if (loading) return <Loading className="mt-4 flex w-full justify-center" />

  return (
    <>
      <div className="flex min-h-screen flex-col p-3">
        <div className="grid w-full grid-flow-row grid-cols-1 place-items-start gap-2 lg:grid-cols-2">
          {extensions.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} />
          ))}
        </div>
      </div>
    </>
  )
}
