import { IPagination } from "@/utils/database-types"

interface IPaginationPerPageProps {
  perPage: number
  setPagination: (pagination: IPagination) => void
}

const PaginationPerPage = ({
  perPage,
  setPagination,
}: IPaginationPerPageProps) => {
  const paginationOptions = [50, 100, 500]

  return (
    <select
      className="m-1 h-8 w-14 cursor-pointer rounded-md border border-slate-200 p-1 text-xs outline-none hover:bg-slate-50 focus:border-kwil focus:outline-none focus:ring-0"
      onChange={(e) =>
        setPagination({
          currentPage: 1,
          perPage: parseInt(e.currentTarget.value),
        })
      }
      value={perPage}
    >
      {paginationOptions.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default PaginationPerPage
