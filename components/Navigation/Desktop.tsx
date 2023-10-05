"use client"

import Main from "./Main"

export default function DesktopNavigation() {
  return (
    <div className="hidden bg-kwil lg:fixed lg:flex lg:min-h-screen lg:w-16 lg:flex-col">
      <Main />
    </div>
  )
}
