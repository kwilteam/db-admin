import classNames from "classnames"
import { KwilTypes } from "@/utils/database-types"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import useActionForm from "@/hooks/useActionForm"

interface IActionFormProps {
  database: string
  action: KwilTypes.ActionSchema | undefined
  executeAction: (formValues: Record<string, string>) => void
}

export default function ActionForm({
  database,
  action,
  executeAction,
}: IActionFormProps) {
  const { inputs, errors, isDirty, validateInput, validateForm } =
    useActionForm({
      database,
      action,
    })

  const triggerAction = (event: React.FormEvent<HTMLFormElement>) => {
    const formValues = validateForm(event)
    if (formValues) {
      executeAction(formValues)
    }
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
          <Button context="primary">Execute Action</Button>
        </div>
      </form>
    </div>
  )
}
