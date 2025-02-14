import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import classNames from "classnames"
import { IQuery } from "@/utils/idb/queries"
import { ChevronRightIcon, PlusIcon } from "@/utils/icons"
import { ItemType } from "@/utils/database-types"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  deleteQueryFromStores,
  loadQueries,
  selectDatabaseActiveContext,
  selectQueries,
  setDatabaseActiveContext,
} from "@/store/database"
import { setAlert, setIsMenuOpen } from "@/store/global"
import useDatabaseParams from "@/hooks/database/use-database-params"

export default function QueriesList({ dbid }: { dbid: string }) {
  const { dbid: dbidParam, query: activeQuery } = useDatabaseParams()
  const dispatch = useAppDispatch()
  const queries = useAppSelector((state) => selectQueries(state, dbid))

  useEffect(() => {
    dispatch(loadQueries(dbid))
  }, [dbid, dispatch])

  return (
    <>
      <QueryItem
        key={`${dbid}-new`}
        dbid={dbid}
        name="new"
        active={dbid === dbidParam && "new" === activeQuery}
      />
      {queries &&
        queries.map((query: IQuery) => {
          return (
            <QueryItem
              key={query.name}
              dbid={dbid}
              name={query.name}
              active={dbid === dbidParam && query.name === activeQuery}
            />
          )
        })}
    </>
  )
}

const QueryItem = ({
  dbid,
  name,
  active,
}: {
  dbid: string
  name: string
  active: boolean
}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const activeDatabaseContext = useAppSelector(selectDatabaseActiveContext)

  const triggerDeleteQuery = (e: React.MouseEvent) => {
    e.stopPropagation()

    const c = confirm(`Are you sure you want to delete '${name}'?`)

    if (c) {
      dispatch(deleteQueryFromStores({ dbid, name }))
      dispatch(
        setAlert({
          type: "success",
          text: `Query "${name}" has now been deleted.`,
        }),
      )

      // If we delete the active query, we need navigate away from this query view
      if (
        activeDatabaseContext &&
        dbid === activeDatabaseContext.namespace &&
        activeDatabaseContext.type === ItemType.QUERY &&
        name === activeDatabaseContext.name
      ) {
        dispatch(setDatabaseActiveContext(undefined))
        router.push(`/databases/${dbid}/query/new`)
      }
    }
  }

  return (
    <div
      key={`${dbid}-${name}`}
      className="group ml-6 flex cursor-pointer select-none overflow-hidden text-sm"
    >
      <Link
        href={`/databases/${dbid}/query/${name}`}
        className={classNames(
          "flex select-none flex-row items-center gap-1 hover:text-slate-900",
          {
            "text-slate-500 ": !active,
            "font-semibold text-slate-900": active,
          },
        )}
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

      {name !== "new" && (
        <span
          className="ml-auto hidden px-2 text-slate-400 hover:text-slate-700 group-hover:flex md:hidden"
          onClick={(e) => triggerDeleteQuery(e)}
        >
          x
        </span>
      )}
    </div>
  )
}
