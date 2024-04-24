import { Fragment, useRef } from "react"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Listbox, Transition } from "@headlessui/react"
import {
  closeSchema,
  selectActiveSchema,
  selectOpenSchemas,
  setActiveSchema,
} from "@/store/ide"
import { CheckIcon, ChevronUpDownIcon } from "@/utils/icons"
import useHorizontalScroll from "@/hooks/use-horizontal-scroll"

export default function OpenedSchemas() {
  const dispatch = useAppDispatch()
  const openedSchemas = useAppSelector(selectOpenSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)

  const triggerCloseSchema = (schema: string) => {
    dispatch(closeSchema(schema))
  }

  const triggerSetActiveSchema = (schema: string) => {
    dispatch(setActiveSchema(schema))
  }

  return (
    <>
      {openedSchemas.length > 0 && (
        <>
          <MobileOpenedSchemas
            triggerCloseSchema={triggerCloseSchema}
            triggerSetActiveSchema={triggerSetActiveSchema}
            openedSchemas={openedSchemas}
            activeSchema={activeSchema}
          />
          <DesktopOpenedSchemas
            triggerCloseSchema={triggerCloseSchema}
            triggerSetActiveSchema={triggerSetActiveSchema}
            openedSchemas={openedSchemas}
            activeSchema={activeSchema}
          />
        </>
      )}
    </>
  )
}

interface IOpenedSchemasProps {
  triggerCloseSchema: (schema: string) => void
  triggerSetActiveSchema: (schema: string) => void
  openedSchemas: string[]
  activeSchema: string
}

function MobileOpenedSchemas({
  triggerCloseSchema,
  triggerSetActiveSchema,
  openedSchemas,
  activeSchema,
}: IOpenedSchemasProps) {
  return (
    <div className="flex w-full lg:hidden">
      <Listbox value={activeSchema} onChange={triggerSetActiveSchema}>
        <div className="relative m-2 w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-200 bg-white py-2 pl-3 text-left text-sm">
            <span className="block truncate">{activeSchema}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {openedSchemas.map((schema) => (
                <Listbox.Option
                  key={schema}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-kwil/10 text-slate-900" : "text-slate-600"
                    }`
                  }
                  value={schema}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames({
                          "block truncate": true,
                          "font-medium": selected,
                          "font-normal": !selected,
                        })}
                      >
                        {schema}
                      </span>

                      <span
                        className="absolute inset-y-2 right-3  text-slate-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          triggerCloseSchema(schema)
                        }}
                      >
                        x
                      </span>

                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-kwil">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

function DesktopOpenedSchemas({
  triggerCloseSchema,
  triggerSetActiveSchema,
  openedSchemas,
  activeSchema,
}: IOpenedSchemasProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { onDragStart, onDragMove, onDragEnd, onWheel } = useHorizontalScroll(scrollContainerRef);

  return (
    // overflow to scroll max width 80% to prevent overflow
    <div 
      className="no-scrollbar m-1 hidden h-10 flex-row gap-1 lg:flex overflow-scroll overflow-x-auto max-w-[calc(100%-390px)] overflow-y-hidden"
      ref={scrollContainerRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onWheel={onWheel}
    >
      {openedSchemas.map((schema) => (
        <div
          key={schema}
          data-testid={`${schema}-schema-tab`}
          className={classNames({
            "bg-slate-50": schema === activeSchema,
            "items-bottom flex cursor-pointer select-none rounded-md rounded-b-none pb-0 text-sm hover:bg-slate-50 no-scrollbar":
              true,
          })}
        >
          <span
            className="p-2 pr-0"
            onClick={() => triggerSetActiveSchema(schema)}
          >
            {schema}.kf
          </span>
          <span
            className="ml-2 pr-1 pt-1 text-xs text-slate-400"
            onClick={() => triggerCloseSchema(schema)}
          >
            x
          </span>
        </div>
      ))}
    </div>
  )
}
