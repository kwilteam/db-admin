"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectFilters, setFilterValue } from "@/store/extensions"
import VerifiedBadge from "../Badge/Verified"
import OfficialBadge from "../Badge/Official"

export default function ExtensionFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)
  const [timeoutVal, setTimeoutVal] = useState<NodeJS.Timeout | null>(null)
  const [tempSearch, setTempSearch] = useState<string>(filters?.search ?? "")

  const setSearchValue = (value: string) => {
    setTempSearch(value)

    if (timeoutVal) {
      clearTimeout(timeoutVal)
    }

    setTimeoutVal(
      setTimeout(() => {
        dispatch(setFilterValue({ key: "search", value: value }))
      }, 500),
    )
  }

  return (
    <div className="w-full bg-white">
      <div className="flex h-10 items-center justify-between bg-slate-50 pl-2 text-sm">
        Filters
      </div>
      <div className="m-2">
        <div className="flex items-center justify-between px-2 py-1 text-sm underline">
          Search
        </div>
        <input
          className="m-1 flex w-full items-start rounded-md border border-slate-100 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-kwil"
          type="text"
          placeholder="Extension name..."
          value={tempSearch}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <div className="flex items-center justify-between px-2 py-1 text-sm underline">
          Trusted Content
        </div>
        <ul className="ml-4 mt-2 flex list-none flex-col gap-2">
          <li className="cursor-pointer">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={filters.official === "true"}
                onChange={(e) =>
                  dispatch(
                    setFilterValue({
                      key: "official",
                      value: e.target.checked ? "true" : "false",
                    }),
                  )
                }
              />
              <OfficialBadge />
            </label>
          </li>
          <li className="cursor-pointer">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={filters.verified === "true"}
                onChange={(e) =>
                  dispatch(
                    setFilterValue({
                      key: "verified",
                      value: e.target.checked ? "true" : "false",
                    }),
                  )
                }
              />
              <VerifiedBadge />
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}
