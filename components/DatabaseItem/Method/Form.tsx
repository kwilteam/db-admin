"use client"

import { useState } from "react"
import { IActionInfo, ItemType } from "@/utils/database-types"
import useActionForm from "@/hooks/use-action-form"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import Loading from "@/components/Loading"
import Input from "@/components/Input"

interface IActionFormProps {
  method: IActionInfo
  executeAction: (
    formValues: Record<string, string>,
  ) => Promise<boolean | undefined>,
  type: ItemType;
}

export default function MethodForm({
  method,
  executeAction,
  type
}: IActionFormProps) {
  const [isExecuting, setIsExecuting] = useState(false)
  const { cleanInputs, errors, isDirty, validateInput, validateForm, resetForm } =
    useActionForm({
      method,
    })

  const triggerAction = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsExecuting(true)
    const isValid = validateForm(event)
    if (isValid) {
      const { formValues, form } = isValid
      const success = await executeAction(formValues)
      // Only clear the form if the action was successful
      if (success) {
        resetForm(form)
      }
    }

    setIsExecuting(false)
  }

  return (
    <div className="flex-1">
      <h2 className="text-md py-2 text-slate-900 underline">Inputs</h2>
      <form
        onSubmit={(e) => {
          triggerAction(e)
        }}
      >
        {cleanInputs &&
          cleanInputs.map((input) => {
            return (
              <div className="flex flex-row" key={input}>
                <label className="m-1 w-56 overflow-hidden p-2 text-slate-900">
                  {input}
                </label>
                <Input
                  data-testid={`action-input-${input}`}
                  name={input}
                  className="m-1 flex-1 rounded-md border bg-white p-2"
                  error={errors[input] && isDirty}
                  type="text"
                  onChange={(e) => {
                    validateInput(input, e.target.value)
                  }}
                />
              </div>
            )
          })}
        {!cleanInputs?.length && <Alert type="info" text="No inputs" />}

        <div className="my-2">
          {!isExecuting && (
            <Button data-testid="execute-action" context="primary">
              Execute {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          )}
          {isExecuting && <Loading className="p-2" />}
        </div>
      </form>
    </div>
  )
}
