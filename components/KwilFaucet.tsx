import { FaucetIcon } from "@/utils/icons"

export const KwilFaucet = () => {
  return (
    <a
      href="https://faucet.kwil.com"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-1 flex items-center text-sm text-white hover:underline lg:text-kwil"
    >
      <FaucetIcon className="mr-1 h-4 w-4" />
      <span className="hidden lg:flex">Faucet</span>
    </a>
  )
}
