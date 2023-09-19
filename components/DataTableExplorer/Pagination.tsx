import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/util/icons"

export default function Pagination() {
  return (
    <div className="justify-left flex w-full gap-2 border-t border-slate-200 bg-slate-50 p-3 text-center text-sm">
      <button className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-gray-500">
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <div className="text-gray-500">
        Page
        <select className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-gray-500">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        of 1
      </div>
      <button className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-gray-500">
        <ChevronRightIcon className="h-4 w-4" />
      </button>
      <select className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-gray-500">
        <option>100 rows</option>
        <option>500 rows</option>
        <option>1000 rows</option>
      </select>
      <div className="m-1 text-gray-500">1000 records</div>
    </div>
  )
}
