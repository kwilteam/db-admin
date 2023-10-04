import { SortIcon } from "@/utils/icons"
import { Popover, Switch, Transition } from "@headlessui/react"
import { Fragment, useMemo } from "react"
import Button from "@/components/Button"
import useTableSort from "@/hooks/useTableSort"
import { ITableSort } from "@/utils/database-types"
import classNames from "classnames"

interface ISortingProps {
  database: string
  table: string
  columns: string[]
}

export default function Sorting({ database, table, columns }: ISortingProps) {
  const {
    tempSort,
    activeSort,
    copyActiveSort,
    addSort,
    applySort,
    removeSort,
    setSortValue,
    sortBtnText,
  } = useTableSort({
    database,
    table,
  })

  const remainingColumns = useMemo(
    () =>
      columns.filter(
        (column) => !tempSort.map((sort) => sort.column).includes(column),
      ),
    [columns, tempSort],
  )

  return (
    <div
      className={classNames({
        "m-1 flex cursor-pointer flex-row justify-center rounded-md p-2 text-center text-slate-500 drop-shadow-xl active:text-slate-700":
          true,
        "bg-kwil-light/30": activeSort && activeSort.length > 0,
      })}
    >
      {columns && (
        <Popover as="div">
          {({ open, close }) => (
            <>
              <Popover.Button
                className="flex select-none flex-row gap-1"
                onClick={() => {
                  copyActiveSort()
                }}
              >
                <SortIcon className="mr-1 h-5 w-4" />
                {sortBtnText}
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
                <Popover.Panel className="absolute -ml-3 mt-5 flex w-80 origin-top-right flex-col rounded-md bg-white ring-1 ring-slate-200 ring-opacity-60 focus:outline-none">
                  {tempSort.length === 0 && (
                    <div className="flex justify-start p-3 text-sm">
                      No sort has been applied yet.
                    </div>
                  )}

                  <div className="flex flex-col justify-between gap-1 p-1 text-sm">
                    {tempSort.length > 0 &&
                      tempSort.map((sort, index) => (
                        <div key={sort.column}>
                          <Sort
                            index={index}
                            tempSort={tempSort}
                            removeSort={removeSort}
                            setSortValue={setSortValue}
                          />
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-row items-center justify-between border-t border-slate-200 p-2 font-semibold">
                    {remainingColumns.length === 0 && (
                      <div className="flex justify-start text-xs">
                        All columns have been added.
                      </div>
                    )}

                    {remainingColumns.length > 0 && (
                      <div className="flex flex-row gap-2">
                        <select
                          className="rounded-md p-1 text-xs outline-none hover:bg-slate-50"
                          onChange={(e) => {
                            addSort(e.target.value)
                          }}
                        >
                          <option>select a column to sort by</option>
                          {remainingColumns.map((column) => (
                            <option key={column} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        applySort(close)
                      }}
                    >
                      Apply sort
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

interface ISortProps {
  index: number
  tempSort: ITableSort[]
  removeSort: (index: number) => void
  setSortValue: (index: number, key: keyof ITableSort, newValue: string) => void
}

function Sort({ index, tempSort, removeSort, setSortValue }: ISortProps) {
  return (
    <div className="flex flex-row gap-2 p-1">
      <div className="flex w-1/2 flex-col items-start justify-center text-xs">
        {tempSort[index].column}
      </div>

      <Switch.Group as="div" className="flex items-center gap-2">
        <Switch.Label className="flex items-center text-xs">
          ascending
        </Switch.Label>
        <Switch
          checked={tempSort[index].direction === "asc"}
          onChange={(isChecked) => {
            setSortValue(index, "direction", isChecked ? "asc" : "desc")
          }}
          className={classNames({
            "bg-kwil/50": tempSort[index].direction === "asc",
            "bg-slate-100": tempSort[index].direction === "desc",
            "relative inline-flex h-5 w-8 items-center rounded-full": true,
          })}
        >
          <span
            className={classNames({
              "translate-x-4": tempSort[index].direction === "asc",
              "translate-x-1": tempSort[index].direction === "desc",
              "inline-block h-3 w-3 transform rounded-full bg-white": true,
            })}
          />
        </Switch>
      </Switch.Group>
      <div
        className="flex flex-1 cursor-pointer items-center justify-center p-1 text-xs text-slate-500 hover:text-slate-700"
        onClick={() => removeSort(index)}
      >
        x
      </div>
    </div>
  )
}
