import { initDb } from "@/utils/admin/db"
import { NextResponse } from "next/server"

export const GET = (req: Request) => {
  initDb()
  return NextResponse.json({})
}
