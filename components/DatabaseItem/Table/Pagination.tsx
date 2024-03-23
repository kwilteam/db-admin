"use client"

import { selectTableQueryParams, setTablePagination } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { IPagination } from "@/utils/database-types"
import PaginationButton from "../Pagination/PaginationButton"
import PaginationPage from "../Pagination/PaginationPage"
import PaginationPerPage from "../Pagination/PaginationPerPage"

interface IPaginationProps {
  dbid: string
  table: string
  totalCount: number | undefined
  isLoading: boolean
}

export default function Pagination({
  dbid,
  table,
  totalCount,
  isLoading,
}: IPaginationProps) {
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, dbid, table),
  )
  const dispatch = useAppDispatch()
  const count = totalCount || 0

  const pagination = tableQueryParams?.pagination
  const currentPage = pagination?.currentPage || 1
  const perPage = pagination?.perPage || 50
  const totalPages = Math.ceil(count / perPage)

  const setPagination = (pagination: IPagination) => {
    dispatch(
      setTablePagination({
        dbid,
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
      <PaginationPage
        {...{ perPage, currentPage, totalPages, setPagination }}
      />
      <PaginationButton
        {...{ perPage, currentPage, setPagination, totalPages, type: "next" }}
      />
      <PaginationPerPage {...{ perPage, setPagination }} />
    </div>
  )
}
