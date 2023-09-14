import "./globals.css"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"

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

      <body className={manrope.className}>{children}</body>
    </html>
  )
}
