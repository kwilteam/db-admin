"use client"
import { useSearchParams } from "next/navigation"
import Intro from "./Intro"
import InitAccount from "./InitAccount"
import Mnemonic, { TMnemonic } from "./Mnemonic"
import { EnumAccountType } from "@/utils/admin/schema"

interface ISetupProcessProps {
  accountExists: boolean | undefined
  privateKeySetup: boolean
  signedIn: boolean
}

export default function SetupProcess({
  accountExists,
  privateKeySetup,
  signedIn,
}: ISetupProcessProps) {
  const searchParams = useSearchParams()
  const continueSetup = searchParams.get("continue")
  const type = searchParams.get("type")
  const typeId = Number(type) as EnumAccountType
  const mnemonic = searchParams.get("mnemonic") as TMnemonic

  return (
    <>
      {!continueSetup && !accountExists && <Intro />}
      {continueSetup && !accountExists && <InitAccount typeId={typeId} />}
      {accountExists && signedIn && !privateKeySetup && (
        <Mnemonic mnemonic={mnemonic} />
      )}
    </>
  )
}
