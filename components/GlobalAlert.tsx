"use client"

import classNames from "classnames"
import { useAppSelector } from "@/store/hooks"
import { selectAlert, selectIsMenuOpen } from "@/store/global"
import Alert from "./Alert"

export default function GlobalAlert() {
  const alert = useAppSelector(selectAlert)
  const isMenuOpen = useAppSelector(selectIsMenuOpen)

  if (!alert) return null

  return (
    <div
      className={classNames({
        "absolute left-1/2 z-50 w-full -translate-x-1/2 transform p-2 md:w-auto":
          true,
        "bottom-0": alert.position === "bottom",
        "top-0": alert.position === "top" && isMenuOpen,
        "top-14 md:top-0": alert.position === "top" && !isMenuOpen,
        "pl-[72px] md:pl-2": isMenuOpen,
      })}
    >
      <Alert test-id="global-alert" type={alert.type} text={alert.text} />
    </div>
  )
}
