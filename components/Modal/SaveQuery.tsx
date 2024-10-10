import { ModalEnum, selectModal } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import Button from "../Button"
import Input from "../Input"
import Base from "./Base"
import useSaveQuery from "@/hooks/database/use-save-query"

interface ISaveQueryModal {
  dbid: string
  queryName: string
  sql: string
  isNewQuery: boolean
}

export default function SaveQueryModal({
  dbid,
  isNewQuery,
  queryName,
  sql,
}: ISaveQueryModal) {
  const modal = useAppSelector(selectModal)
  const { error, saveQuery, closeModal, name, setName } = useSaveQuery(
    dbid,
    isNewQuery,
    queryName,
    sql,
  )

  const modalBody = (
    <form onSubmit={saveQuery} className="flex flex-1 flex-col">
      <Input
        type="text"
        className="border-m mx-3 my-2 border"
        placeholder="Query Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error.length > 0}
      />

      {error.length > 0 && (
        <div className="mb-2 ml-4 flex flex-1 flex-col items-start">
          {error.map((e) => (
            <div key={e} className="text-sm text-red-500">
              {e}
            </div>
          ))}
        </div>
      )}
    </form>
  )

  const modalFooter = (
    <div className="flex justify-between px-3">
      <Button context="secondary" size="md" onClick={closeModal}>
        Cancel
      </Button>

      <Button context="primary" size="md" onClick={saveQuery}>
        Save
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.SAVE_QUERY}
      closeModal={closeModal}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
