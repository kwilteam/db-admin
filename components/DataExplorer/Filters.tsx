import { FilterIcon, SortIcon } from "@/util/icons"

export default function Filters() {
  return (
    <div className="justify-left flex w-full gap-1 border-b border-slate-200 bg-slate-50/50 p-1 text-center text-sm">
      <div className="m-1 flex cursor-pointer flex-row justify-center rounded-md p-1 text-center text-slate-500 hover:bg-kwil-light/30 hover:text-slate-700">
        <FilterIcon className="mr-1 h-5 w-4" />
        Filter
      </div>
      <div className="m-1 flex cursor-pointer flex-row rounded-md p-1 text-center text-slate-500 hover:bg-kwil-light/30 hover:text-slate-700">
        <SortIcon className="mr-1 h-5 w-4" />
        Sort
      </div>
    </div>
  )
}
