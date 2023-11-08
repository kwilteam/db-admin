"use client"

import Image from "next/image"
import PublisherBadge from "../Badge/Publisher"
import OfficialBadge from "../Badge/Official"
import VerifiedBadge from "../Badge/Verified"
import { IKwilExtension } from "@/store/extensions"

interface IExtensionViewProps {
  extension: IKwilExtension
}

export default function ExtensionView({ extension }: IExtensionViewProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex min-h-[160px] w-full flex-row justify-center gap-4 border-b border-slate-100 bg-slate-50/20">
          <div className="my-3 flex w-full flex-col items-center gap-2 overflow-hidden text-sm text-gray-500 md:w-1/2">
            <Image
              className="h-16 w-16 rounded-lg p-1"
              src={extension.image}
              alt={extension.name}
              width={60}
              height={60}
            />
            <div className="font-medium text-gray-900">{extension.name}</div>
            <div className="text-wrap flex-1 overflow-hidden text-center">
              {extension.description}
            </div>
            <div className="flex flex-row gap-4">
              <PublisherBadge publisher={extension.publisher} />
              {extension.official && <OfficialBadge />}
              {extension.verifiedPublisher && <VerifiedBadge />}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center gap-4">
          <div className="mx-2 flex w-full flex-col gap-2 md:w-2/3 md:flex-row">
            <div className="flex flex-1 flex-col border border-slate-200">
              <div className="flex bg-slate-50 p-2">About</div>
              <div className="flex p-2">{extension.readme}</div>
            </div>

            {extension.installation && (
              <div className="flex w-full flex-col border border-slate-200 md:w-1/3">
                <div className="flex bg-slate-50 p-2">Installation</div>
                <div className="flex p-2">{extension.installation}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
