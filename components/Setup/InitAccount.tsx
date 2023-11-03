import Button from "../Button"
import EmailAccount from "./EmailAccount"
import Link from "next/link"
import WalletAccount from "./WalletAccount"
import { EnumAccountType } from "@/utils/admin/schema"

interface IAdminAccountProps {
  typeId: EnumAccountType | undefined
}

export default function InitAccount({ typeId }: IAdminAccountProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:w-2/3">
      <div className="flex text-lg">Create Admin Account</div>
      {!typeId && (
        <>
          <div className="flex justify-center">
            <Link href={`/setup?continue=true&type=${EnumAccountType.Wallet}`}>
              <Button context="primary" size="md">
                Continue with Wallet
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-center justify-center text-sm text-slate-500">
            <hr className="flex-grow" />
            <span className="px-2">or</span>
            <hr className="flex-grow" />
          </div>
          <div className="flex justify-center">
            <Link href={`/setup?continue=true&type=${EnumAccountType.Email}`}>
              <Button context="primary" size="md">
                Continue with Email
              </Button>
            </Link>
          </div>
        </>
      )}
      {typeId !== undefined && typeId === EnumAccountType.Email && (
        <EmailAccount />
      )}
      {typeId !== undefined && typeId === EnumAccountType.Wallet && (
        <WalletAccount />
      )}
    </div>
  )
}
