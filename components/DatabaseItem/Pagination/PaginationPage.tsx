import { IPagination } from "@/utils/database-types"

interface IPaginationPageProps {
  perPage: number
  currentPage: number
  totalPages: number
  setPagination: (pagination: IPagination) => void
}

const PaginationPage = ({
  perPage,
  currentPage,
  totalPages,
  setPagination,
}: IPaginationPageProps) => {
  return (
    <div className="text-slate-500">
      Page
      <select
        className="m-1 h-8 w-12 cursor-pointer rounded-md border border-slate-200 p-1 text-xs outline-none hover:bg-slate-50 focus:border-kwil focus:outline-none focus:ring-0"
        onChange={(e) =>
          setPagination({
            currentPage: parseInt(e.currentTarget.value),
            perPage,
          })
        }
        value={currentPage}
      >
        {Array.from(Array(totalPages).keys()).map((page) => (
          <option value={page + 1} key={page + 1}>
            {page + 1}
          </option>
        ))}
      </select>
      of {totalPages}
    </div>
  )
}

export default PaginationPage
