import { initDb } from "@/utils/admin/db"
import { NextResponse } from "next/server"

export const GET = () => {
  initDb()
  return NextResponse.json({})
}
