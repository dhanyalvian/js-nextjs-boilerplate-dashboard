//- src/app/api/auth/register/route.ts

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // call your backend (Go API)
  const url = process.env.CONFIG_API_URL || "http://localhost:8080"
  const res = await fetch(url + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json({ message: "Register failed" }, { status: 401 })
  }

  const data = await res.json()

  return NextResponse.json({ data: data, success: true })
}
