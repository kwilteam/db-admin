import Link from "next/link"
import Button from "../Button"
import Alert from "../Alert"
import useWalletAccountSetup from "@/hooks/useWalletAccountSetup"

export default function WalletAccount() {
  const {
    address,
    name,
    error,
    success,
    setName,
    createWalletAccount,
    getAddressFromWallet,
  } = useWalletAccountSetup()

  return (
    <form
      className="flex w-full flex-col justify-center gap-2"
      onSubmit={(e) => createWalletAccount(e)}
    >
      Wallet
      {error && <Alert type="error" className="w-full" text={error} />}
      {!address && (
        <Alert
          type="info"
          className="w-full cursor-pointer"
          text="Please connect your Wallet to continue. Click connect."
          onClick={() => getAddressFromWallet()}
        />
      )}
      {success && <Alert type="success" className="w-full" text={success} />}
      <input
        placeholder="Address"
        test-id="address-input"
        className="flex-1 rounded-md border bg-white p-2 text-sm text-slate-400"
        type="text"
        disabled
        value={address}
      />
      <input
        placeholder="Name"
        test-id="name-input"
        className="flex-1 rounded-md border bg-white p-2 text-sm"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div className="flex flex-row-reverse justify-between">
        <Button context="primary" size="md">
          Create Account
        </Button>

        <Link href="/setup?continue=true">
          <Button context="secondary" size="md">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}
