import { IPagination } from "@/utils/database-types"
import { ChevronLeftIcon, ChevronRightIcon } from "@/utils/icons"

interface IPaginationButtonProps {
  perPage: number
  currentPage: number
  setPagination: (pagination: IPagination) => void
  totalPages: number
  type: "next" | "prev"
}

const PaginationButton = ({
  perPage,
  currentPage,
  setPagination,
  totalPages,
  type,
}: IPaginationButtonProps) => {
  const isDisabled =
    type === "prev" ? currentPage === 1 : currentPage === totalPages

  return (
    <button
      data-testid={`pagination-button-${type}`}
      className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white p-0 px-1 text-slate-500"
      disabled={isDisabled}
      onClick={() => {
        const newPage = type === "next" ? currentPage + 1 : currentPage - 1

        setPagination({
          currentPage: newPage,
          perPage,
        })
      }}
    >
      {type === "next" ? (
        <ChevronRightIcon className="h-4 w-4" />
      ) : (
        <ChevronLeftIcon className="h-4 w-4" />
      )}
    </button>
  )
}

export default PaginationButton
