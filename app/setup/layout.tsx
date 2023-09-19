import React from "react"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  return <div>{children}</div>
}
