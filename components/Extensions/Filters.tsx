"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Loading from "../Loading"

export default function SchemaExplorer() {
  const dispatch = useAppDispatch()

  return (
    <div className="w-full bg-white">
      <div className="flex h-10 items-center bg-slate-50 pl-2 text-sm">
        Filters
      </div>
      <div className="ml-2 mt-2">
        <div className="flex items-center justify-between px-2 py-1 text-sm underline">
          Trusted Content
        </div>
        <ul className="ml-4 mt-2 flex list-none flex-col gap-2">
          <li className="cursor-pointer">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox"
                // checked={}
                onChange={() => {}}
              />
              <span>Official Kwil Extension</span>
            </label>
          </li>
          <li className="cursor-pointer">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox"
                // checked={}
                onChange={() => {}}
              />
              <span>Verified Publisher</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}
