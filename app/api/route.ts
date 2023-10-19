import { initDb } from "@/utils/admin-db/db"
import { NextResponse } from "next/server"

export const GET = (req: Request) => {
  initDb()
  return NextResponse.json({})
}
