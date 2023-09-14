import React from "react"

interface Props {
  userName: string
}

export default function UserInfo({ userName }: Props) {
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")

  return (
    <div className="flex select-none flex-row gap-3 lg:border-t lg:border-kwil-dark/40 lg:p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm uppercase text-slate-700">
        {initials}
      </div>
      <div className="hidden items-center justify-center text-sm text-slate-100 lg:flex">
        {userName}
      </div>
    </div>
  )
}
