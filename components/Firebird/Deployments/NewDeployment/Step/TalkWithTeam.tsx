import { useState, ReactNode } from "react"

const calenderUrl = process.env.NEXT_PUBLIC_CALENDER_URL

export function TalkWithTeam(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)

  return (
    <>
      <div className="flex select-none flex-row items-center rounded-b-md border-t border-slate-200 bg-slate-50 p-1 text-slate-700">
        <div className="flex flex-grow flex-col pl-2">
          <span className="text-xs text-slate-600">
            Schedule a call with our team to discuss your deployment.
          </span>
        </div>
        <button
          className="m-1 rounded-md bg-kwil px-3 py-2 text-sm text-slate-50"
          onClick={openModal}
        >
          Talk with team
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="flex h-full w-full flex-col gap-1 p-2 lg:w-[450px]">
            <h3 className="p-1 text-xl font-bold tracking-tighter">
              Talk with us
            </h3>
            <p className="p-1 text-sm text-slate-600">
              Let&apos;s talk about your deployment.
            </p>
            <iframe
              src={calenderUrl}
              width="100%"
              height="100%"
              className="mt-2 rounded-md border border-slate-200"
              title="Talk with team"
            />
          </div>
        </Modal>
      )}
    </>
  )
}

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative h-full w-full bg-white lg:h-[90%] lg:w-auto lg:rounded-md">
      <button
        className="absolute right-2 top-2 rounded-md p-2 text-sm text-slate-600 hover:text-slate-800"
        onClick={onClose}
      >
        ✕
      </button>
      {children}
    </div>
  </div>
)
