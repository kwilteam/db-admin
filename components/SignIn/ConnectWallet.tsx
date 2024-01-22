"use client"

import Button from "../Button"

export default function ConnectWallet() {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex justify-center">
        <Button context="primary" size="md">
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
