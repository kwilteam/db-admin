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
    <div className="flex select-none flex-row gap-3 border-t-[1px] border-kwil-dark/40 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm uppercase text-slate-700">
        {initials}
      </div>
      <div className="flex items-center justify-center text-sm text-slate-100">
        {userName}
      </div>
    </div>
  )
}
