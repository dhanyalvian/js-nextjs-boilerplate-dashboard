//- src/app/api/auth/login/route.ts

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // call your backend (Go API)
  const url = process.env.CONFIG_API_URL || "http://localhost:8080"
  const res = await fetch(url + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json({ message: "Login failed" }, { status: 401 })
  }

  const data = await res.json()

  ;(await cookies()).set("access_token", data.record.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  })

  ;(await cookies()).set("refresh_token", data.record.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  })

  return NextResponse.json({ success: true })
}
