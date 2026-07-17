//- src/app/api/v1/[...path]/route.ts

import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value || ""
}

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname
    const endpoint = pathname.replace(process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || "/api/v1", "")
    const accessToken = await getAccessToken()

    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    const api = axios.create({
      baseURL: process.env.CONFIG_API_URL ?? "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    const { data } = await api.get(endpoint, {
      params: {
        search: search,
        page: page,
        limit: limit,
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response
      return NextResponse.json(data, { status })
    }

    console.error("Proxy Error:", error)
    return NextResponse.json(
      { message: error },
      { status: 500 }
    )
  }
}
