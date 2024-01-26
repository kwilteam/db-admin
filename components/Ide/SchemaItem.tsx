import useDeleteSchema from "@/hooks/ide/useDeleteSchema"
import { setIsMenuOpen } from "@/store/global"
import { useAppDispatch } from "@/store/hooks"
import { loadSchema, openSchema } from "@/store/ide"
import { FileIcon } from "@/utils/icons"

interface ISchemaItemProps {
  schema: string
}

export default function SchemaItem({ schema }: ISchemaItemProps) {
  const dispatch = useAppDispatch()
  const triggerDeleteSchema = useDeleteSchema()

  const triggerOpenSchema = (schema: string) => {
    dispatch(loadSchema(schema))
    dispatch(openSchema(schema))
  }

  return (
    <li
      key={schema}
      test-id={`schema-item-${schema}`}
      className="group flex h-10 cursor-pointer select-none items-center gap-1 p-2 pl-3 pr-2 text-xs hover:bg-slate-50"
      onClick={() => {
        triggerOpenSchema(schema)
        dispatch(setIsMenuOpen(false))
      }}
    >
      <FileIcon className="h-4 w-4" />
      <span className="w-full">{schema}.kf</span>
      <span
        className="invisible ml-auto p-2 text-slate-400 hover:text-slate-700 group-hover:visible"
        onClick={(e) => triggerDeleteSchema(e, schema)}
        test-id={`schema-item-${schema}-delete`}
      >
        x
      </span>
    </li>
  )
}
