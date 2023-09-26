"use client"

import { selectTableQueryParams, setTablePagination } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ChevronLeftIcon, ChevronRightIcon } from "@/utils/icons"

interface IPaginationProps {
  totalCount: number | undefined
  database: string
  table: string
}

export default function Pagination({
  totalCount,
  database,
  table,
}: IPaginationProps) {
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )
  const dispatch = useAppDispatch()
  const count = totalCount || 0
  const paginationOptions = [50, 100, 500]

  const pagination = tableQueryParams?.pagination
  const currentPage = pagination?.currentPage || 1
  const perPage = pagination?.perPage || 50
  const totalPages = Math.ceil(count / perPage)

  return (
    <div className="flex w-full gap-2 border-t border-slate-200 bg-slate-50/50 bg-white p-3 text-center text-sm">
      <button
        className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
        onClick={() => {
          if (currentPage !== 1)
            dispatch(
              setTablePagination({
                database,
                table,
                pagination: {
                  currentPage: currentPage - 1,
                  perPage,
                },
              }),
            )
        }}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <div className="text-slate-500">
        Page
        <select
          className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
          onChange={(e) =>
            dispatch(
              setTablePagination({
                database,
                table,
                pagination: {
                  currentPage: parseInt(e.currentTarget.value),
                  perPage,
                },
              }),
            )
          }
          value={currentPage}
        >
          {Array.from(Array(totalPages).keys()).map((page) => (
            <option value={page + 1} key={page + 1}>
              {page + 1}
            </option>
          ))}
        </select>
        of {totalPages}
      </div>
      <button
        className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
        onClick={() => {
          if (currentPage !== totalPages)
            dispatch(
              setTablePagination({
                database,
                table,
                pagination: {
                  currentPage: currentPage + 1,
                  perPage,
                },
              }),
            )
        }}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
      <select
        className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
        onChange={(e) =>
          dispatch(
            setTablePagination({
              database,
              table,
              pagination: {
                currentPage: 1,
                perPage: parseInt(e.currentTarget.value),
              },
            }),
          )
        }
        value={perPage}
      >
        {paginationOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
