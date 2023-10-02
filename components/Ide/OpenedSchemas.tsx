import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  closeSchema,
  selectActiveSchema,
  selectSchemas,
  setActiveSchema,
} from "@/store/ide"
import classNames from "classnames"

export default function OpenedSchemas() {
  const openedSchemas = useAppSelector(selectSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)
  const dispatch = useAppDispatch()

  const triggerCloseSchema = (schema: string) => {
    dispatch(closeSchema(schema))
  }

  const triggerSetActiveSchema = (schema: string) => {
    dispatch(setActiveSchema(schema))
  }

  return (
    <div className="m-1 flex h-10 flex-row gap-1">
      {openedSchemas.map((schema) => (
        <div
          key={schema}
          className={classNames({
            "bg-slate-50": schema === activeSchema,
            "items-bottom flex cursor-pointer select-none rounded-md rounded-b-none pb-0 text-sm hover:bg-slate-50":
              true,
          })}
        >
          <span
            className="p-2 pr-0"
            onClick={() => triggerSetActiveSchema(schema)}
          >
            {schema}.kf
          </span>
          <span
            className="ml-2 pr-1 pt-1 text-xs text-slate-400"
            onClick={() => triggerCloseSchema(schema)}
          >
            x
          </span>
        </div>
      ))}
    </div>
  )
}
