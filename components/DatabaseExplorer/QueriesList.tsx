import { useEffect } from "react"
import Link from "next/link"
import classNames from "classnames"
import { IQuery } from "@/utils/idb/queries"
import { ChevronRightIcon, PlusIcon } from "@/utils/icons"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadQueries, selectQueries } from "@/store/database"
import { setIsMenuOpen } from "@/store/global"

export default function QueriesList({ dbid }: { dbid: string }) {
  const dispatch = useAppDispatch()
  const queries = useAppSelector((state) => selectQueries(state, dbid))

  useEffect(() => {
    dispatch(loadQueries(dbid))
  }, [dbid, dispatch])

  return (
    <>
      <QueryItem key={`${dbid}-new`} dbid={dbid} name="new" />
      {queries &&
        queries.map((query: IQuery) => {
          return <QueryItem key={query.name} dbid={dbid} name={query.name} />
        })}
    </>
  )
}

const QueryItem = ({ dbid, name }: { dbid: string; name: string }) => {
  const dispatch = useAppDispatch()

  return (
    <div key={`${dbid}-${name}`} className="ml-6 overflow-hidden text-sm">
      <Link
        href={`/databases/${dbid}/query/${name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 ": true,
          "font-semibold text-slate-900": false,
        })}
        onClick={() => {
          dispatch(setIsMenuOpen(false))
        }}
      >
        {name === "new" && (
          <>
            <PlusIcon className="h-3 w-3" />
            <span className="max-w-[80%]">New</span>
          </>
        )}

        {name !== "new" && (
          <>
            <ChevronRightIcon className="h-3 w-3" />
            <span className="max-w-[80%]">{name}</span>
          </>
        )}
      </Link>
    </div>
  )
}
