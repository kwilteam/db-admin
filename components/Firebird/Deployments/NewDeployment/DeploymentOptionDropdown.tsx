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
  options: string[]
  defaultValue?: string | number
}

export function DeploymentOptionDropdown({
  title,
  description,
  parentKey,
  propertyKey,
  handleChange,
  defaultValue,
  options,
}: IDeploymentOptionInputProps) {
  const newDeployment = useAppSelector(selectNewDeployment)
  const value: string | number | undefined =
    newDeployment?.[parentKey]?.[propertyKey] ?? defaultValue

  return (
    <>
      <div>
        {title.length > 0 && (
          <label
            htmlFor={propertyKey}
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            {title}
          </label>
        )}
        {description.length > 0 && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        <div className="mt-2">
          <select
            id={propertyKey}
            name={propertyKey}
            required
            className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
            value={value}
            onChange={(e) =>
              handleChange(parentKey, propertyKey, e.target.value)
            }
          >
            {options.map((option) => (
              <option key={option} value={option} defaultValue={defaultValue}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
