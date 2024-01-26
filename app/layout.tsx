import type { Metadata } from "next"
import classNames from "classnames"
import { Manrope } from "next/font/google"
import { ReduxProvider } from "@/providers/StoreProvider"
import "./globals.css"
import { IdbProvider } from "@/providers/IdbProvider"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KwilDB Admin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>

      <body
        className={classNames({
          [manrope.className]: true,
          "text-slate-700": true,
        })}
      >
        <ReduxProvider>
          <IdbProvider>{children}</IdbProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
