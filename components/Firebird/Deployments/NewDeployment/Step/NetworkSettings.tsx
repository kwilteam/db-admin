import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdNetworkSettings,
  KwilVersions,
  selectNewDeployment,
  setCurrentStep,
  setNewDeploymentNetworkSettings,
} from "@/store/firebird"
import { NetworkSettingsStepIcon } from "@/utils/icons"
import { Step } from "../Step"
import { generateRandomString } from "@/utils/random-name-generator"

export function NetworkSettingsStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const isStepComplete = useCallback(
    (
      updatedNetworkSettings:
        | IFirebirdNetworkSettings
        | undefined = newDeployment?.networkSettings,
    ) => {
      return (
        updatedNetworkSettings?.chainId &&
        updatedNetworkSettings?.chainId.length > 0 &&
        updatedNetworkSettings?.kwilVersion &&
        updatedNetworkSettings?.kwilVersion.length > 0 &&
        updatedNetworkSettings?.companyName &&
        updatedNetworkSettings?.companyName.length > 0
      )
    },
    [newDeployment],
  )

  const handleChange = useCallback(
    (valueKey: keyof IFirebirdNetworkSettings, value: string) => {
      const updatedNetworkSettings = {
        ...newDeployment?.networkSettings,
        [valueKey]: value,
      }

      dispatch(
        setNewDeploymentNetworkSettings({
          key: valueKey,
          value: value,
        }),
      )

      if (isStepComplete(updatedNetworkSettings)) {
        dispatch(setCurrentStep(3))
      } else {
        dispatch(setCurrentStep(2))
      }
    },
    [newDeployment, isStepComplete, dispatch],
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
      icon={<NetworkSettingsStepIcon />}
      title="Network settings"
      description="Decide on the settings you require for your deployment."
    >
      <div className="flex flex-col gap-2">
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
    <div className="mt-2">
      <input
        autoComplete="off"
        id="chainId"
        name="chainId"
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
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
    <div className="mt-2">
      <select
        id="kwilVersion"
        name="kwilVersion"
        required
        className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
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
    <div className="mt-2">
      <input
        autoComplete="off"
        id="companyName"
        name="companyName"
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
        value={value}
        onChange={(e) => onChange("companyName", e.target.value)}
      />
    </div>
  </div>
)
