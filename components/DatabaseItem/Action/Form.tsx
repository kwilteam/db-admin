"use client"

import { useState } from "react"
import classNames from "classnames"
import { KwilTypes } from "@/utils/database-types"
import useActionForm from "@/hooks/useActionForm"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import Loading from "@/components/Loading"

interface IActionFormProps {
  action: KwilTypes.ActionSchema | undefined
  executeAction: (formValues: Record<string, string>) => Promise<void>
}

export default function ActionForm({
  action,
  executeAction,
}: IActionFormProps) {
  const [isExecuting, setIsExecuting] = useState(false)
  const { inputs, errors, isDirty, validateInput, validateForm, resetForm } =
    useActionForm({
      action,
    })

  const triggerAction = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsExecuting(true)
    const isValid = validateForm(event)

    if (isValid) {
      const { formValues, form } = isValid
      await executeAction(formValues)
      resetForm(form)
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
        {inputs &&
          inputs.map((input) => {
            return (
              <div className="flex flex-row" key={input}>
                <label className="m-1 w-56 overflow-hidden p-2 text-slate-900">
                  {input}
                </label>
                <input
                  name={input}
                  className={classNames({
                    "m-1 flex-1 rounded-md border bg-white p-2": true,
                    "border-red-500/70": (errors[input] && isDirty) ?? false,
                    "border-slate-200/40": !errors[input] ?? true,
                  })}
                  type="text"
                  onChange={(e) => {
                    validateInput(input, e.target.value)
                  }}
                />
              </div>
            )
          })}
        {!inputs?.length && (
          <Alert type="info" text="No inputs" className="m-2" />
        )}

        <div className="m-2">
          {!isExecuting && <Button context="primary">Execute Action</Button>}
          {isExecuting && <Loading className="p-2" />}
        </div>
      </form>
    </div>
  )
}