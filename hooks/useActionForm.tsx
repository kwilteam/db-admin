import { ActionSchema } from "kwil/dist/core/database"
import { useCallback, useEffect, useState } from "react"

interface IUseActionFormProps {
  action: ActionSchema | undefined
}

export default function useActionForm({ action }: IUseActionFormProps) {
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

  interface IValidateFormProps {
    formValues: Record<string, string>
    form: HTMLFormElement
  }

  const validateForm = useCallback(
    (
      event: React.FormEvent<HTMLFormElement>,
    ): IValidateFormProps | undefined => {
      const form = event.currentTarget
      setIsDirty(true)

      event.preventDefault()
      if (!inputs) return

      const formData = new FormData(form)
      const formValues: Record<string, string> = {}

      // Validate inputs
      inputs.map((input) => {
        formValues[input] = formData.get(input) as string
        validateInput(input, formValues[input])
      })

      if (Object.values(errors).some((error) => error)) {
        console.log("Invalid inputs", errors)
        return
      }

      return { formValues, form }
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

  const resetForm = useCallback(
    (form: HTMLFormElement) => {
      setIsDirty(false)

      const initialErrors: Record<string, boolean> = {}
      inputs?.forEach((input) => {
        initialErrors[input] = true
      })
      console.log("Resetting errors", initialErrors)
      setErrors(initialErrors)

      form.reset()
    },
    [inputs],
  )

  return {
    inputs,
    errors,
    isDirty,
    validateInput,
    validateForm,
    resetForm,
  }
}
