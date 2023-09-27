"use client"

import { selectTableQueryParams, setTablePagination } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ITablePagination } from "@/utils/database-types"
import { ChevronLeftIcon, ChevronRightIcon } from "@/utils/icons"

interface IPaginationProps {
  database: string
  table: string
  totalCount: number | undefined
  isLoading: boolean
}

export default function Pagination({
  database,
  table,
  totalCount,
  isLoading,
}: IPaginationProps) {
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )
  const dispatch = useAppDispatch()
  const count = totalCount || 0

  const pagination = tableQueryParams?.pagination
  const currentPage = pagination?.currentPage || 1
  const perPage = pagination?.perPage || 50
  const totalPages = Math.ceil(count / perPage)

  const setPagination = (pagination: ITablePagination) => {
    dispatch(
      setTablePagination({
        database,
        table,
        pagination,
      }),
    )
  }

  if (isLoading) return null

  return (
    <div className="flex w-full gap-2 border-t border-slate-200 bg-slate-50/50 bg-white p-3 text-center text-sm">
      <PaginationButton
        {...{ perPage, currentPage, setPagination, totalPages, type: "prev" }}
      />
      <SelectPage {...{ perPage, currentPage, totalPages, setPagination }} />
      <PaginationButton
        {...{ perPage, currentPage, setPagination, totalPages, type: "next" }}
      />
      <SelectPerPage {...{ perPage, setPagination }} />
    </div>
  )
}

interface ISelectPageProps {
  perPage: number
  currentPage: number
  totalPages: number
  setPagination: (pagination: ITablePagination) => void
}

const SelectPage = ({
  perPage,
  currentPage,
  totalPages,
  setPagination,
}: ISelectPageProps) => {
  return (
    <div className="text-slate-500">
      Page
      <select
        className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
        onChange={(e) =>
          setPagination({
            currentPage: parseInt(e.currentTarget.value),
            perPage,
          })
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
  )
}

interface ISelectPerPageProps {
  perPage: number
  setPagination: (pagination: ITablePagination) => void
}

const SelectPerPage = ({ perPage, setPagination }: ISelectPerPageProps) => {
  const paginationOptions = [50, 100, 500]

  return (
    <select
      className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
      onChange={(e) =>
        setPagination({
          currentPage: 1,
          perPage: parseInt(e.currentTarget.value),
        })
      }
      value={perPage}
    >
      {paginationOptions.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

interface IPaginationButtonProps {
  perPage: number
  currentPage: number
  setPagination: (pagination: ITablePagination) => void
  totalPages: number
  type: "next" | "prev"
}

const PaginationButton = ({
  perPage,
  currentPage,
  setPagination,
  totalPages,
  type,
}: IPaginationButtonProps) => {
  const isDisabled =
    type === "prev" ? currentPage === 1 : currentPage === totalPages

  return (
    <button
      className="m-1 cursor-pointer rounded-md border border-slate-200 bg-white px-1 text-slate-500"
      disabled={isDisabled}
      onClick={() => {
        const newPage = type === "next" ? currentPage + 1 : currentPage - 1

        setPagination({
          currentPage: newPage,
          perPage,
        })
      }}
    >
      {type === "next" ? (
        <ChevronRightIcon className="h-4 w-4" />
      ) : (
        <ChevronLeftIcon className="h-4 w-4" />
      )}
    </button>
  )
}
