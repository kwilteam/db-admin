import { IFirebirdNewDeployment, selectNewDeployment } from "@/store/firebird"
import { useAppSelector } from "@/store/hooks"

interface IDeploymentOptionInputProps {
  title: string
  description: string
  parentKey: keyof IFirebirdNewDeployment
  propertyKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment]
  handleChange: (
    parentKey: keyof IFirebirdNewDeployment,
    propertyKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment],
    value: string,
  ) => void
}

export function DeploymentOptionInput({
  title,
  description,
  parentKey,
  propertyKey,
  handleChange,
}: IDeploymentOptionInputProps) {
  const newDeployment = useAppSelector(selectNewDeployment)
  const value: string | undefined = newDeployment?.[parentKey]?.[propertyKey]

  return (
    <>
      <div>
        <label
          htmlFor={propertyKey}
          className="block text-sm font-medium leading-6 text-gray-700"
        >
          {title}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2">
          <input
            id={propertyKey}
            name={propertyKey}
            type="text"
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
            onChange={(e) =>
              handleChange(parentKey, propertyKey, e.target.value)
            }
            value={value}
          />
        </div>
      </div>
    </>
  )
}
