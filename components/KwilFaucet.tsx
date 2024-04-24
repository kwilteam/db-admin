import { useAppSelector } from "@/store/hooks"
import { selectActiveProvider } from "@/store/providers"
import { FaucetIcon } from "@/utils/icons"
import classNames from "classnames"

export const KwilFaucet = () => {
  const activeProvider = useAppSelector(selectActiveProvider)

  return (
    <a
      href="https://faucet.kwil.com"
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "mr-1 flex items-center text-sm text-white hover:underline lg:text-kwil",
        {
          "hidden": activeProvider !== "Testnet"
        }
    )}
    >
      <FaucetIcon className="mr-1 h-4 w-4" />
      <span className="hidden lg:flex">Faucet</span>
    </a>
  )
}
