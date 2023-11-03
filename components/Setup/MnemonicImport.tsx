import { useState } from "react"
import Button from "../Button"
import Loading from "../Loading"
import { createAdminPk } from "@/utils/api"
import Link from "next/link"
import Alert from "../Alert"
import classNames from "classnames"

export default function CreateMnemonic() {
  const [loading, setLoading] = useState(false)
  const [mnemonic, setMnemonic] = useState<string>()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<boolean>()

  const createProviderPk = async () => {
    if (!mnemonic) {
      setError(true)
      return
    }

    setLoading(true)

    try {
      setError(false)
      const result = await createAdminPk(mnemonic)

      if (result.outcome === "success") {
        setSuccess(true)

        setTimeout(() => {
          window.location.href = "/"
        }, 1000)

        setLoading(false)
        return
      }

      setError(true)
    } catch (error) {
      console.log(error)
      setError(true)
    }

    setLoading(false)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {success && (
        <Alert text="Provider account has been created..." type="success" />
      )}

      {error && (
        <Alert text="Please check your mnemonic and try again" type="error" />
      )}

      <>
        <div className="grid grid-cols-4 gap-1">
          <textarea
            className={classNames({
              "col-span-4 rounded-md border p-2 text-sm": true,
              "border-red-500": error,
              "border-slate-300": !error,
            })}
            value={mnemonic ?? ""}
            onChange={(e) => setMnemonic(e.currentTarget.value)}
          />
        </div>

        <div
          className={classNames({
            flex: true,
            "justify-center": loading,
            "justify-between": !loading,
          })}
        >
          {loading && <Loading />}
          {!loading && !success && (
            <>
              <Link href="/setup">
                <Button context="secondary" size="md">
                  Cancel
                </Button>
              </Link>

              <Button
                context="primary"
                size="md"
                onClick={() => createProviderPk()}
              >
                Create Provider Account
              </Button>
            </>
          )}
        </div>
      </>
    </div>
  )
}
