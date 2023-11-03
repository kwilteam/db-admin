import { useEffect, useState } from "react"
import Button from "../Button"
import Loading from "../Loading"
import { createAdminPk, generateMnemonic } from "@/utils/api"
import Link from "next/link"
import Alert from "../Alert"
import classNames from "classnames"

export default function CreateMnemonic() {
  const [loadingMnemonic, setLoadingMnemonic] = useState(true)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [mnemonic, setMnemonic] = useState<string | null>()
  const [mnemonicSaved, setMnemonicSaved] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const generateMnemonicAsync = async () => {
      setLoadingMnemonic(true)

      try {
        const result = await generateMnemonic()

        if (result.outcome === "success" && result.data) {
          setMnemonic(result.data)
          setLoadingMnemonic(false)
          return
        }

        alert("Error generating mnemonic")
      } catch (error) {
        console.log(error)
        setLoadingMnemonic(false)
      }
    }

    generateMnemonicAsync()
  }, [])

  const createProviderPk = async () => {
    if (!mnemonic) return

    setLoadingCreate(true)

    try {
      const result = await createAdminPk(mnemonic)

      if (result.outcome === "success") {
        setSuccess(true)

        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }

    setLoadingCreate(false)
  }

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
          <div className="grid grid-cols-4 gap-1">
            {mnemonic.split(" ").map((word, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-center rounded-md bg-slate-50 p-1">
                    {word}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center">
            <div className="flex h-6 items-center">
              <input
                aria-describedby="comments-description"
                name="mnemonicSaved"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={mnemonicSaved}
                onChange={(e) => setMnemonicSaved(e.target.checked)}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="mnemonicSaved"
                className="font-medium text-gray-900"
              >
                I have saved my mnemonic phrase
              </label>
            </div>
          </div>
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
        </>
      )}
    </div>
  )
}
