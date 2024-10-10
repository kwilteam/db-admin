import { Fragment } from "react"
import Image from "next/image"
import { Dialog, Transition } from "@headlessui/react"
import KwilLogo from "@/public/images/kwil-white-horizontal.svg"
import { CloseIcon } from "@/utils/icons"

interface IModalProps {
  show: boolean
  children: React.ReactNode
  footer: React.ReactNode
  closeModal: () => void
}

export default function Base({
  show,
  children,
  footer,
  closeModal,
}: IModalProps) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-hidden">
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
                <Dialog.Panel className="flex max-h-[calc(100vh-2rem)] w-full max-w-md transform flex-col overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <div className="relative flex flex-grow flex-col items-center overflow-hidden">
                    <div
                      className="absolute right-2 top-2 cursor-pointer rounded-full border border-white/20 p-1 text-white hover:bg-white/30"
                      onClick={closeModal}
                    >
                      <CloseIcon className="h-4 w-4" />
                    </div>
                    <div className="flex h-full w-full flex-col rounded-md text-center">
                      <div className="flex-shrink-0 rounded-t-md bg-kwil">
                        <Image
                          src="/images/kwil-white-horizontal.png"
                          alt="Kwil Logo"
                          className="mx-auto h-auto p-4"
                          width={200}
                          height={120}
                          priority
                        />
                      </div>

                      <div className="flex-grow overflow-y-auto">
                        {children}
                      </div>

                      <div className="flex-shrink-0 rounded-b-md bg-white pb-3">
                        {footer}
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
