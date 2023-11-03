import Link from "next/link"
import Button from "../Button"
import MnemonicCreate from "./MnemonicCreate"
import MnemonicImport from "./MnemonicImport"

export type TMnemonic = "create" | "import" | null

interface IMnemonicProps {
  mnemonic: TMnemonic
}

export default function Mnemonic({ mnemonic }: IMnemonicProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:w-2/3">
      <div className="flex text-lg">Kwil Provider Mnemonic</div>
      {mnemonic !== "create" && mnemonic !== "import" && (
        <>
          <div className="flex justify-center">
            <Link href={`/setup?continue=true&mnemonic=create`}>
              <Button context="primary" size="md">
                Create New
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-center justify-center text-sm text-slate-500">
            <hr className="flex-grow" />
            <span className="px-2">or</span>
            <hr className="flex-grow" />
          </div>
          <div className="flex justify-center">
            <Link href={`/setup?continue=true&mnemonic=import`}>
              <Button context="primary" size="md">
                Import
              </Button>
            </Link>
          </div>
        </>
      )}

      {mnemonic === "create" && <MnemonicCreate />}
      {mnemonic === "import" && <MnemonicImport />}
    </div>
  )
}
