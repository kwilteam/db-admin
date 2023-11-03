import { useState } from "react"
import Button from "../Button"
import Link from "next/link"

export default function WalletAccount() {
  const [name, setName] = useState("")

  const createWalletAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Get the user's wallet address
    // Ensure name is entered
    // Post wallet address and name to API with signature of the Display Name and Wallet to prove ownership
    // If successful, sign the user in and continue to the Mnemonic page
    alert("createWalletAccount")
  }

  return (
    <form
      className="flex w-full flex-col justify-center gap-2"
      onSubmit={(e) => createWalletAccount(e)}
    >
      Wallet
      <input
        placeholder="Name"
        test-id="name-input"
        className="flex-1 rounded-md border bg-white p-2"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div className="flex justify-between">
        <Link href="/setup?continue=true">
          <Button context="secondary" size="md">
            Cancel
          </Button>
        </Link>

        <Button context="primary" size="md">
          Create Account
        </Button>
      </div>
    </form>
  )
}
