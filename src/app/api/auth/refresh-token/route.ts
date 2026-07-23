//- src/app/api/auth/refresh-token/route.ts

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 })
  }

  const url = process.env.CONFIG_API_URL || "http://localhost:8080"
  const res = await fetch(url + "/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) {
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    return NextResponse.json({ message: "Refresh token expired" }, { status: 401 })
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
