"use client"

import {
  IFirebirdNewDeployment,
  selectNewDeployment,
  setNewDeployment,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import classNames from "classnames"
import { Montserrat } from "next/font/google"
import { useDispatch } from "react-redux"

const heading = Montserrat({
  weight: "500",
  subsets: ["latin"],
})

export default function DeploymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const newDeployment = useAppSelector(selectNewDeployment)
  // const isNew = id === "new"

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2
              className={classNames({
                [heading.className]: true,
                "text-xl leading-tight tracking-tighter text-slate-700": true,
              })}
            >
              Select a network
            </h2>
            <p className="text-sm text-slate-500">
              Select a network to deploy to.
            </p>
          </div>

          <div className="flex flex-row gap-2 p-2 text-slate-500">
            <span>Step 1 / 6</span>
          </div>
        </div>

        <div className="flex w-full flex-row gap-2">
          <DeploymentOptionCard
            title="Testnet"
            subtitle="Kwil Testnet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            // selected
            optionKey="network"
            optionValue="testnet"
          />

          <DeploymentOptionCard
            title="Mainnet"
            subtitle="Kwil Mainnet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            optionKey="network"
            optionValue="mainnet"
            talkWithTeam
          />
        </div>

        {newDeployment && newDeployment.talkWithTeam && <TalkWithTeam />}
      </div>

      <div
        className={classNames({
          "flex flex-col gap-4 p-4": true,
          hidden: !newDeployment?.network,
        })}
      >
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2
              className={classNames({
                [heading.className]: true,
                "text-xl leading-tight tracking-tighter text-slate-700": true,
              })}
            >
              Select a network
            </h2>
            <p className="text-sm text-slate-500">
              Select a network to deploy to.
            </p>
          </div>

          <div className="flex flex-row gap-2 p-2 text-slate-500">
            <span>Step 1 / 6</span>
          </div>
        </div>

        <div className="flex w-full flex-row gap-2">
          <DeploymentOptionCard
            title="Testnet"
            subtitle="Kwil Testnet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            // selected
            optionKey="network"
            optionValue="testnet"
          />

          <DeploymentOptionCard
            title="Mainnet"
            subtitle="Kwil Mainnet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            optionKey="network"
            optionValue="mainnet"
            talkWithTeam
          />
        </div>

        {newDeployment && newDeployment.talkWithTeam && <TalkWithTeam />}
      </div>
    </>
  )
}

function DeploymentOptionCard({
  title,
  subtitle,
  description,
  optionKey,
  optionValue,
  talkWithTeam,
}: {
  title: string
  subtitle: string
  description: string
  optionKey: keyof IFirebirdNewDeployment
  optionValue: string | number | boolean
  talkWithTeam?: boolean
}) {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const setDeploymentValue = () => {
    if (talkWithTeam) {
      dispatch(setNewDeployment({ key: "talkWithTeam", value: true }))
      dispatch(setNewDeployment({ key: optionKey, value: undefined }))
    } else {
      dispatch(setNewDeployment({ key: "talkWithTeam", value: false }))
      dispatch(setNewDeployment({ key: optionKey, value: optionValue }))
    }
  }

  const _classNames = classNames({
    "flex flex-grow cursor-pointer select-none flex-row gap-2 rounded-md border border-slate-200 bg-slate-50/70 p-4 lg:max-w-[50%] hover:border-kwil/60 hover:bg-kwil/5":
      true,
    "bg-white opacity-70": talkWithTeam,
    // "hover:border-kwil/60 hover:bg-kwil/5": !talkWithTeam,
    "border border-kwil/80 bg-kwil/5":
      newDeployment?.[optionKey] === optionValue,
  })

  return (
    <div className={_classNames} onClick={setDeploymentValue}>
      <div className="flex flex-col gap-1">
        <span className="text-xl tracking-tighter text-slate-700">{title}</span>
        <span className="text-sm text-slate-600">{subtitle}</span>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
    </div>
  )
}

function TalkWithTeam() {
  return (
    <div className="flex select-none flex-row items-center gap-2 rounded-md border border-kwil/80 bg-slate-50/80 p-4 text-slate-700 lg:max-w-[50%]">
      <div className="flex flex-grow flex-col gap-1">
        <span className="text-xl tracking-tighter">Talk with team</span>
        <span className="text-sm text-slate-500">
          Schedule a call with our team to discuss your deployment.
        </span>
      </div>
      <button className="h-10 rounded-md bg-kwil px-4 py-2 text-sm text-slate-50">
        Schedule a call
      </button>
    </div>
  )
}
