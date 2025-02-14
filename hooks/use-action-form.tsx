import { IActionInfo } from "@/utils/database-types"
import { ActionSchema, NamedType, Procedure } from "@kwilteam/kwil-js/dist/core/database"
import { useCallback, useEffect, useMemo, useState } from "react"

interface IUseActionFormProps {
  method: IActionInfo
}

export default function useActionForm({ method }: IUseActionFormProps) {
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [cleanInputs, setCleanInputs] = useState<string[]>([])
  const inputs = useMemo(() => method?.parameter_names === null ? [] : method?.parameter_names, [method?.parameter_names]);

  useEffect(() => {
    if (!inputs) return

    setCleanInputs(cleanParams(inputs))

    const cleanInputs = cleanParams(inputs);
    const initialErrors: Record<string, boolean> = {}
    cleanInputs.forEach((input) => {
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
      const tempErrors = []
      setIsDirty(true)

      event.preventDefault()
      if (!inputs) return

      const formData = new FormData(form)
      const formValues: Record<string, string> = {}

      const cleanInputs = cleanParams(inputs);
      // Validate inputs
      cleanInputs?.map((input) => {
        formValues[input] = formData.get(input) as string
        if (!validateInput(input, formValues[input])) {
          tempErrors.push(input)
        }
      })

      if (tempErrors.length) {
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
      return false
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, [input]: false }
      })
      return true
    }
  }

  const resetForm = useCallback((form: HTMLFormElement) => {
    setIsDirty(false)

    form.reset()
  }, [])

  return {
    cleanInputs,
    errors,
    isDirty,
    validateInput,
    validateForm,
    resetForm,
  }
}

function cleanParams(params: readonly string[] | readonly NamedType[]): string[] {
  return params?.map((param) => {
    if (typeof param === "string") {
      return param;
    }

    return param.name;
  })
}
