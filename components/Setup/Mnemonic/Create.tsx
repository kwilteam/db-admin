import Link from "next/link"
import classNames from "classnames"
import useCreateMnemonic from "@/hooks/useCreateMnemonic"
import Button from "../../Button"
import Loading from "../../Loading"
import Alert from "../../Alert"
import WordList from "./WordList"
import Saved from "./Saved"
import CreateActions from "./CreateActions"

export default function CreateMnemonic() {
  const {
    mnemonic,
    mnemonicSaved,
    loadingMnemonic,
    loadingCreate,
    success,
    setMnemonicSaved,
    createProviderPk,
  } = useCreateMnemonic()

  if (loadingMnemonic)
    return (
      <div>
        <Loading />
      </div>
    )

  return (
    <div className="flex w-full flex-col gap-4">
      {success && (
        <Alert
          title="Success"
          text="Provider account has been created..."
          type="success"
        />
      )}

      {mnemonic && (
        <>
          <WordList mnemonic={mnemonic} />

          <Saved
            mnemonicSaved={mnemonicSaved}
            setMnemonicSaved={setMnemonicSaved}
          />

          <CreateActions
            success={success}
            loadingCreate={loadingCreate}
            mnemonicSaved={mnemonicSaved}
            createProviderPk={createProviderPk}
          />
        </>
      )}
    </div>
  )
}
