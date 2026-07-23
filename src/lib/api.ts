//- src/lib/api.ts

import { useState } from "react"

export const useCurl = () => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [page, setPage] = useState(1)
  const limit = 20
  
  return {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    page,
    setPage,
    limit,
  }
}

export const ApiInternal = async (path: string, options?: RequestInit) => {
  const ep = process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || "/api/v1"
  const url = `${ep}${path}`
  const res = await fetch(url, { ...options })

  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh-token", { method: "POST" })

    if (!refreshRes.ok) {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/login"
      throw new Error("Unauthorized")
    }

    const retryRes = await fetch(url, { ...options })
    const data = await retryRes.json()
    return data
  }

  const data = await res.json()
  return data
}
