"use client"

import { useEffect, useState } from "react"
import { getExtension } from "@/utils/api"
import { IKwilExtension } from "@/store/extensions"
import ExtensionView from "@/components/Extensions/View"
import Loading from "@/components/Loading"
import Alert from "@/components/Alert"
import Link from "next/link"
import { ChevronRightIcon } from "@/utils/icons"

interface IProps {
  params: {
    id: number
  }
}

export default function ExtensionPage({ params }: IProps) {
  const { id } = params
  const [extension, setExtension] = useState<IKwilExtension | undefined>(
    undefined,
  )
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchExtension = async () => {
      if (!id) return

      try {
        const _extension = await getExtension(Number(id))

        if (_extension.outcome === "error") {
          setError(true)

          return
        }

        setExtension(_extension.data as IKwilExtension)
      } catch (error) {
        setError(true)
        console.log(error)
      }
    }

    fetchExtension()
  }, [id])

  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex h-8 cursor-pointer select-none flex-row items-center gap-2 bg-slate-50 p-3 text-sm">
        <Link href={"/extensions"} className="hover:underline">
          Extensions
        </Link>
        {extension && <ChevronRightIcon className="h-4 w-4" />}
        {extension && <div className="font-medium">{extension.name}</div>}
      </div>

      {!extension && !error && (
        <Loading className="mt-4 flex w-full justify-center" />
      )}
      {error && (
        <Alert
          type="error"
          text="Extension could be be found"
          className="m-2"
        />
      )}
      {extension && <ExtensionView extension={extension} />}
    </div>
  )
}
