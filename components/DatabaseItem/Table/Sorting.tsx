import { SortIcon } from "@/utils/icons"

interface ISortingProps {
  columns: string[] | undefined
}

export default function Sorting({ columns }: ISortingProps) {
  return (
    <div className="m-1 flex cursor-pointer flex-row rounded-md p-2 text-center text-slate-500 hover:bg-kwil-light/30 hover:text-slate-700">
      {columns && (
        <>
          <SortIcon className="mr-1 h-5 w-4" />
          Sort
        </>
      )}
    </div>
  )
}
