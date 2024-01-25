import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment } from "react"
import { getAddress } from "@/utils/wallet"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentAccount, setCurrentAccount } from "@/store/global"
import Button from "./Button"

export default function ConnectWalletDialog() {
  const currentAccount = useAppSelector(selectCurrentAccount)

  return (
    <>
      <Transition appear show={currentAccount ? false : true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="m-2 flex min-h-full items-start justify-center p-0 text-center md:m-10 md:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center">
                    <div className="flex w-full flex-col rounded-md  text-center">
                      <div className="flex-1 rounded-t-md bg-kwil">
                        <Image
                          src="/images/kwil-white-horizontal.svg"
                          alt="Kwil Logo"
                          className="mx-auto h-auto p-4"
                          width={200}
                          height={120}
                          priority
                        />
                      </div>

                      <div className="flex flex-1 flex-col rounded-b-md border border-slate-200 bg-white p-3">
                        <div className="flex flex-col justify-center gap-3">
                          Connect your wallet to get started
                          <ConnectWallet />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function ConnectWallet() {
  const dispatch = useAppDispatch()

  const connectWallet = async () => {
    try {
      const address = await getAddress()

      dispatch(setCurrentAccount(address))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex justify-center">
        <Button context="primary" size="md" onClick={connectWallet}>
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
