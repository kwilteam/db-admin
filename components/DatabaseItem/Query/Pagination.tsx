"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectQueryPagination, setQueryPagination } from "@/store/database"
import { IPagination } from "@/utils/database-types"
import PaginationButton from "../Pagination/PaginationButton"
import PaginationPerPage from "../Pagination/PaginationPerPage"
import PaginationPage from "../Pagination/PaginationPage"

interface IPaginationProps {
  dbid: string
  queryName: string
  totalCount: number | undefined
  isLoading: boolean
}

export default function Pagination({
  dbid,
  queryName,
  totalCount,
  isLoading,
}: IPaginationProps) {
  const dispatch = useAppDispatch()
  const pagination = useAppSelector((state) =>
    selectQueryPagination(state, dbid, queryName),
  )
  const count = totalCount || 0
  const currentPage = pagination?.currentPage || 1
  const perPage = pagination?.perPage || 50
  const totalPages = Math.ceil(count / perPage)

  const setPagination = (pagination: IPagination) => {
    dispatch(
      setQueryPagination({
        dbid,
        queryName,
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
