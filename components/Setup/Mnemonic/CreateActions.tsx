import Link from "next/link"
import classNames from "classnames"
import Button from "@/components/Button"
import Loading from "@/components/Loading"

interface ICreateActionsProps {
  success: boolean
  loadingCreate: boolean
  mnemonicSaved: boolean
  createProviderPk: () => void
}

export default function CreateActions({
  success,
  loadingCreate,
  mnemonicSaved,
  createProviderPk,
}: ICreateActionsProps) {
  return (
    <div
      className={classNames({
        flex: true,
        "justify-center": success,
        "justify-between": !success,
      })}
    >
      {loadingCreate || (success && <Loading />)}
      {!loadingCreate && !success && (
        <>
          <Link href="/setup">
            <Button context="secondary" size="md">
              Cancel
            </Button>
          </Link>

          <Button
            context="primary"
            size="md"
            disabled={!mnemonicSaved}
            onClick={() => createProviderPk()}
          >
            Create Provider Account
          </Button>
        </>
      )}
    </div>
  )
}
