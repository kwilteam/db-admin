import Image from "next/image"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectNewDeployment,
  setNewDeploymentNetworkSettings,
} from "@/store/firebird"
import { ChainIcon, CompanyIcon, StepIcon } from "@/utils/icons"
import { generateRandomString } from "@/utils/random-name-generator"
import { Step } from "../Step"
import { IFirebirdNetworkSettings, KwilVersions } from "@/utils/firebird/types"

export function NetworkSettingsStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const handleChange = useCallback(
    (valueKey: keyof IFirebirdNetworkSettings, value: string) => {
      dispatch(
        setNewDeploymentNetworkSettings({
          key: valueKey,
          value: value,
        }),
      )
    },
    [dispatch],
  )

  useEffect(() => {
    if (!newDeployment?.networkSettings?.chainId) {
      handleChange("chainId", generateRandomString("chain"))
    }
    if (!newDeployment?.networkSettings?.companyName) {
      handleChange("companyName", generateRandomString("company"))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Step
      step={2}
      icon={<StepIcon />}
      title="Network Settings"
      description="Decide on the settings you require for your deployment."
    >
      <div className="flex flex-col gap-3">
        <ChainIdInput
          value={newDeployment?.networkSettings?.chainId ?? ""}
          onChange={handleChange}
        />
        <KwilVersionSelect
          value={newDeployment?.networkSettings?.kwilVersion ?? ""}
          onChange={handleChange}
        />
        <CompanyNameInput
          value={newDeployment?.networkSettings?.companyName ?? ""}
          onChange={handleChange}
        />
      </div>
    </Step>
  )
}

type InputProps = {
  value: string | undefined
  onChange: (key: keyof IFirebirdNetworkSettings, value: string) => void
}

const ChainIdInput = ({ value, onChange }: InputProps) => (
  <div>
    <label
      htmlFor="chainId"
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      Chain Id
    </label>
    <p className="text-sm text-gray-500">
      The chain Id of the network you want to deploy on.
    </p>
    <div className="mt-2 flex rounded-md shadow-sm">
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-100 bg-slate-50 px-3 text-gray-500 sm:text-sm">
        <ChainIcon className="h-4 w-4" />
      </span>
      <input
        autoComplete="off"
        id="chainId"
        name="chainId"
        type="text"
        required
        className="block w-full rounded-none rounded-r-md border-0 border-l-0 py-1.5 text-sm leading-6 ring-1 ring-inset ring-slate-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-100"
        value={value}
        onChange={(e) => onChange("chainId", e.target.value)}
      />
    </div>
  </div>
)

const KwilVersionSelect = ({ value, onChange }: InputProps) => (
  <div>
    <label
      htmlFor="kwilVersion"
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      Kwil Version
    </label>
    <p className="text-sm text-gray-500">
      The Kwil version you want to deploy.
    </p>
    <div className="mt-2 flex rounded-md shadow-sm">
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-100 bg-slate-50 px-3 text-gray-500 sm:text-sm">
        <Image
          src="/images/kwil.png"
          className="h-4 w-4"
          alt="Kwil"
          width={16}
          height={16}
        />
      </span>
      <select
        id="kwilVersion"
        name="kwilVersion"
        required
        className="block w-full rounded-none rounded-r-md border-0 py-1.5 text-sm leading-6 ring-1 ring-inset ring-slate-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-100"
        value={value}
        onChange={(e) => onChange("kwilVersion", e.target.value)}
      >
        {Object.entries(KwilVersions).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  </div>
)

const CompanyNameInput = ({ value, onChange }: InputProps) => (
  <div>
    <label
      htmlFor="companyName"
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      Company Name
    </label>
    <p className="text-sm text-gray-500">Your company name.</p>
    <div className="mt-2 flex rounded-md shadow-sm">
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-100 bg-slate-50 px-3 text-gray-500 sm:text-sm">
        <CompanyIcon className="h-4 w-4" />
      </span>
      <input
        autoComplete="off"
        id="companyName"
        name="companyName"
        type="text"
        required
        className="block w-full rounded-none rounded-r-md border-0 border-l-0 py-1.5 text-sm leading-6 ring-1 ring-inset ring-slate-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-100"
        value={value}
        onChange={(e) => onChange("companyName", e.target.value)}
      />
    </div>
  </div>
)
