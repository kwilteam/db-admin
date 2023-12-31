"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { IKwilExtension } from "@/store/extensions"
import OfficialBadge from "../Badge/Official"
import VerifiedBadge from "../Badge/Verified"
import PublisherBadge from "../Badge/Publisher"

interface IExtensionCardProps {
  extension: IKwilExtension
}

export default function ExtensionCard({ extension }: IExtensionCardProps) {
  const router = useRouter()

  const navigateToExtension = (id: number) => {
    router.push(`/extensions/${id}`)
  }

  return (
    <div
      className="flex w-full cursor-pointer flex-row gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50/30 md:h-40"
      onClick={() => navigateToExtension(extension.id)}
    >
      <div className="flex flex-col justify-center text-center">
        <Image
          className="h-16 w-16 rounded-lg p-1"
          src={extension.image}
          alt={extension.name}
          width={60}
          height={60}
        />
      </div>
      <div className="my-1 flex flex-1 flex-col gap-2 overflow-hidden text-sm text-gray-500">
        <div className="font-medium text-gray-900">{extension.name}</div>
        <div className="text-wrap md:max-h-auto max-h-36 flex-1 overflow-hidden">
          {extension.description}
        </div>
        <div className="flex flex-col items-start gap-1 md:flex-row md:gap-4">
          <PublisherBadge publisher={extension.publisher} />
          {extension.official === "true" && <OfficialBadge />}
          {extension.verified === "true" && <VerifiedBadge />}
        </div>
      </div>
    </div>
  )
}
