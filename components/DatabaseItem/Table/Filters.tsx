import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { FilterIcon, PlusIcon } from "@/utils/icons"
import { ITableFilter } from "@/utils/database-types"
import classNames from "classnames"
import useTableFilters from "@/hooks/database/useTableFilters"
import Button from "@/components/Button"

interface IFiltersProps {
  dbid: string
  table: string
  columns: string[]
}

const operators = ["=", "!=", ">=", "<=", ">", "<", "is"]

export default function Filters({ dbid, table, columns }: IFiltersProps) {
  const {
    tempFilters,
    activeFilters,
    copyActiveFilters,
    addFilter,
    applyFilters,
    removeFilter,
    setFilterValue,
    filterBtnText,
  } = useTableFilters({
    dbid,
    table,
    columns,
    operators,
  })

  return (
    <div
      className={classNames({
        "m-1 flex cursor-pointer flex-row justify-center rounded-md p-2 text-center text-slate-500 drop-shadow-xl active:text-slate-700":
          true,
        "bg-kwil-light/30": activeFilters && activeFilters.length > 0,
      })}
    >
      {columns && (
        <Popover as="div">
          {({ open, close }) => (
            <>
              <Popover.Button
                className="flex select-none flex-row gap-1"
                onClick={() => {
                  copyActiveFilters()
                }}
              >
                <FilterIcon className="mr-1 h-5 w-4" />
                {filterBtnText}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute -left-1 mt-5 flex w-80 origin-top-right flex-col rounded-md bg-white ring-1 ring-slate-200 ring-opacity-60 focus:outline-none">
                  {tempFilters.length === 0 && (
                    <div className="flex justify-start p-3 text-sm">
                      No filters have been applied yet.
                    </div>
                  )}

                  <div className="flex flex-col justify-between gap-1 p-1 text-sm">
                    {tempFilters.length > 0 &&
                      tempFilters.map((filter, index) => (
                        <div key={index}>
                          <Filter
                            index={index}
                            columns={columns}
                            tempFilters={tempFilters}
                            removeFilter={removeFilter}
                            setFilterValue={setFilterValue}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-row justify-between border-t border-slate-200 p-2 font-semibold">
                    <Button onClick={() => addFilter()}>
                      <PlusIcon className="mr-1 h-3 w-3" /> Add filter
                    </Button>
                    <Button
                      onClick={() => {
                        applyFilters(close)
                      }}
                    >
                      Apply filters
                    </Button>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      )}
    </div>
  )
}

interface IFilterProps {
  index: number
  columns: string[]
  tempFilters: ITableFilter[]
  removeFilter: (index: number) => void
  setFilterValue: (
    index: number,
    key: keyof ITableFilter,
    newValue: string,
  ) => void
}

function Filter({
  index,
  columns,
  tempFilters,
  removeFilter,
  setFilterValue,
}: IFilterProps) {
  return (
    <div className="flex flex-row gap-1">
      <select
        className="w-1/2 rounded-md border border-slate-100 p-1 text-xs hover:bg-slate-50"
        value={tempFilters[index].column}
        onChange={(e) => setFilterValue(index, "column", e.target.value)}
      >
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
      <select
        className="w-1/4 rounded-md border border-slate-100 p-1 text-xs hover:bg-slate-50"
        value={tempFilters[index].operator}
        onChange={(e) => setFilterValue(index, "operator", e.target.value)}
      >
        {operators.map((operator) => (
          <option key={operator} value={operator}>
            {operator}
          </option>
        ))}
      </select>
      <input
        className="w-1/4 rounded-md border border-slate-100 p-1 text-xs placeholder-slate-300 hover:bg-slate-50"
        type="text"
        placeholder={"value"}
        value={tempFilters[index].value}
        onChange={(e) => setFilterValue(index, "value", e.target.value)}
      />
      <div
        className="flex cursor-pointer items-center p-1 text-xs text-slate-500 hover:text-slate-700"
        onClick={() => removeFilter(index)}
      >
        x
      </div>
    </div>
  )
}
