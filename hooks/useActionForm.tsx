import { ActionSchema } from "kwil/dist/core/database"
import { useCallback, useEffect, useState } from "react"

interface IUseActionFormProps {
  database: string
  action: ActionSchema | undefined
}

export default function useActionForm({
  database,
  action,
}: IUseActionFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const inputs = action?.inputs

  useEffect(() => {
    if (!inputs) return

    const initialErrors: Record<string, boolean> = {}
    inputs.forEach((input) => {
      initialErrors[input] = true
    })
    setErrors(initialErrors)
  }, [inputs])

  const validateForm = useCallback(
    (
      event: React.FormEvent<HTMLFormElement>,
    ): Record<string, string> | undefined => {
      const form = event.currentTarget
      setIsDirty(true)

      event.preventDefault()
      if (!inputs) return

      const formData = new FormData(form)
      const formValues: Record<string, string> = {}

      inputs.forEach((input) => {
        formValues[input] = formData.get(input) as string
      })

      // Validate inputs
      inputs.map((input) => {
        validateInput(input, formValues[input])
      })

      if (Object.values(errors).some((error) => error)) {
        console.log("Invalid inputs", errors)
        return
      }

      // If no errors, execute action
      return formValues
    },
    [inputs, errors],
  )

  const validateInput = (input: string, value: string) => {
    if (!value.length) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [input]: true }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, [input]: false }
      })
    }
  }

  return { inputs, errors, isDirty, validateInput, validateForm }
}
