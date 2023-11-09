"use client"

import useWalletSignIn from "@/hooks/useWalletSignIn"
import Button from "../Button"
import Alert from "../Alert"

export default function ConnectWallet() {
  const { error, success, triggerWalletSignIn } = useWalletSignIn()

  return (
    <div className="flex flex-col justify-center gap-2">
      {error && <Alert type="error" className="w-full" text={error} />}
      {success && <Alert type="success" className="w-full" text={success} />}
      <div className="flex justify-center">
        <Button
          context="primary"
          size="md"
          onClick={() => triggerWalletSignIn()}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
