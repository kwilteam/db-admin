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
        className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
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
