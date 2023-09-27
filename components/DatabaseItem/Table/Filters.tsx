import { useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { FilterIcon } from "@/utils/icons"
import { Fragment } from "react"

interface IFiltersProps {
  columns: string[] | undefined
}

export default function Filters({ columns }: IFiltersProps) {
  const [selectedColumn, setSelectedColumn] = useState(
    columns ? columns[0] : "",
  )

  return (
    <div className="m-1 flex cursor-pointer flex-row justify-center rounded-md p-2 text-center text-slate-500 hover:bg-kwil-light/30 hover:text-slate-700">
      {columns && (
        <Menu as="div">
          <Menu.Button className="flex select-none flex-row gap-1">
            <FilterIcon className="mr-1 h-5 w-4" />
            Filter
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {columns.map((column) => (
                  <Menu.Item key={column}>
                    {({ active }) => (
                      <button
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setSelectedColumn(column)}
                      >
                        {column}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}
