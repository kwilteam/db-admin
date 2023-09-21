"use client"

import classNames from "classnames"
import { useAppSelector } from "@/store/hooks"
import { selectAction } from "@/store/database"
import { KwilTypes } from "@/utils/database-types"
import useActionForm from "@/hooks/useActionForm"
import Button from "@/components/Button"
import Alert from "@/components/Alert"
import Loading from "@/components/Loading"

interface IActionFormProps {
  database: string
  actionName: string
}

export default function ActionForm({ database, actionName }: IActionFormProps) {
  const action = useAppSelector((state) =>
    selectAction(state, database, actionName),
  )

  if (!action)
    return (
      <div className="flex justify-center pt-4">
        <Loading />
      </div>
    )

  const statements = action?.statements

  return (
    <div className="flex flex-col rounded-md bg-slate-100/60 p-2">
      <div className="flex flex-row gap-6">
        <InputsForm database={database} action={action} />
        <Statements statements={statements} />
      </div>
    </div>
  )
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-md py-2 text-slate-900 underline">{children}</h2>
}

interface IInputFormProps {
  database: string
  action: KwilTypes.ActionSchema | undefined
}

const InputsForm = ({ database, action }: IInputFormProps) => {
  const { inputs, errors, isDirty, validateInput, executeAction } =
    useActionForm({
      database,
      action,
    })

  return (
    <div className="flex-1">
      <Header>Inputs</Header>
      <form
        onSubmit={(e) => {
          executeAction(e)
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

interface IStatementsProps {
  statements: readonly string[] | undefined
}

const Statements = ({ statements }: IStatementsProps) => {
  return (
    <div className="flex-1">
      <Header>Action Body</Header>
      <div className="flex flex-col gap-2">
        {statements && (
          <code className="flex flex-col gap-2 rounded-md p-2 text-sm">
            {statements.map((statement, index) => {
              return (
                <span key={statement}>
                  {statement}
                  <br />
                </span>
              )
            })}
          </code>
        )}
      </div>
    </div>
  )
}
